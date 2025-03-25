
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const supabaseUrl = Deno.env.get('SUPABASE_URL');
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const imageFile = formData.get('image');
    
    if (!imageFile || !(imageFile instanceof File)) {
      throw new Error('No image file provided');
    }

    console.log(`Processing file: ${imageFile.name}, size: ${imageFile.size} bytes`);

    // Convert file to arrayBuffer for processing
    const arrayBuffer = await imageFile.arrayBuffer();
    const imageBytes = new Uint8Array(arrayBuffer);
    
    console.log("Using OpenAI for OCR and text analysis...");
    
    // Use GPT-4o for both OCR and summary generation
    // This works well for both printed and handwritten text
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system', 
            content: 'You are an expert OCR system specialized in handwriting recognition. Extract all visible text from the image, even if it\'s handwritten, and then provide a concise summary of the content. Format your response with two sections: "EXTRACTED TEXT:" followed by all text you can read, and "SUMMARY:" followed by a brief summary of the content.'
          },
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'Extract all text from this image (including handwriting) and provide a summary of its contents.'
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:${imageFile.type};base64,${btoa(String.fromCharCode(...imageBytes))}`
                }
              }
            ]
          }
        ],
        max_tokens: 1000
      }),
    });

    const result = await response.json();
    
    if (!result.choices || !result.choices[0]) {
      throw new Error('Failed to get a valid response from OpenAI');
    }
    
    const aiResponse = result.choices[0].message.content;
    console.log("AI processing complete");
    
    // Process the AI response to separate text and summary
    let extractedText = '';
    let summary = '';
    
    if (aiResponse.includes('EXTRACTED TEXT:') && aiResponse.includes('SUMMARY:')) {
      const parts = aiResponse.split('SUMMARY:');
      extractedText = parts[0].replace('EXTRACTED TEXT:', '').trim();
      summary = parts[1].trim();
    } else {
      // Fallback if AI didn't format as requested
      extractedText = aiResponse;
      summary = 'Summary not available';
    }

    // Store in Supabase if authenticated
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const userId = req.headers.get('authorization')?.split('Bearer ')[1];
    
    if (userId) {
      try {
        await supabase.from('ocr_history').insert({
          user_id: userId,
          extracted_text: extractedText,
          summary: summary,
          created_at: new Date().toISOString()
        });
        console.log("Saved OCR result to database for user:", userId);
      } catch (dbError) {
        console.error("Failed to save to database:", dbError);
        // Continue processing even if database save fails
      }
    }

    return new Response(
      JSON.stringify({ 
        extractedText, 
        summary 
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  } catch (error) {
    console.error('Error in OCR function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
