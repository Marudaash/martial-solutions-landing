/**
 * API Route: Create lead in GoHighLevel
 * POST /api/lead
 */

export const config = {
  runtime: 'edge',
};

export default async function handler(request) {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, companyName, source, tags, locationId } = body;

    // Create contact in GHL
    const ghlResponse = await fetch('https://services.leadconnectorhq.com/contacts/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GHL_API_KEY}`,
        'Content-Type': 'application/json',
        'Version': '2021-07-28',
      },
      body: JSON.stringify({
        firstName,
        lastName,
        phone,
        email,
        companyName,
        source,
        tags,
        locationId: locationId || process.env.GHL_LOCATION_ID,
      }),
    });

    if (!ghlResponse.ok) {
      const error = await ghlResponse.text();
      console.error('GHL Error:', error);
      return new Response(JSON.stringify({ error: 'Failed to create contact' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const contact = await ghlResponse.json();

    return new Response(JSON.stringify({ 
      success: true, 
      contactId: contact.contact?.id 
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
