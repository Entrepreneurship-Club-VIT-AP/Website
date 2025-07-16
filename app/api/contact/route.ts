import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const { name, email, subject, message } = await request.json();

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Get Discord webhook URL from environment variables
        const webhookURL = process.env.DISCORD_WEBHOOK_URL;
        
        if (!webhookURL) {
            console.error('Discord webhook URL not configured');
            return NextResponse.json(
                { error: 'Server configuration error' },
                { status: 500 }
            );
        }

        // Create Discord embed
        const embed = {
            title: "🚀 New Contact Form Submission",
            color: 0xFC5603, // Orange color
            fields: [
                {
                    name: "📝 Name",
                    value: name,
                    inline: true
                },
                {
                    name: "📧 Email",
                    value: email,
                    inline: true
                },
                {
                    name: "📋 Subject",
                    value: subject,
                    inline: false
                },
                {
                    name: "💬 Message",
                    value: message.length > 1000 ? message.substring(0, 1000) + "..." : message,
                    inline: false
                }
            ],
            footer: {
                text: "Entrepreneurship Club VIT-AP"
            },
            timestamp: new Date().toISOString()
        };

        const payload = {
            username: "Contact Form Bot",
            embeds: [embed]
        };

        // Send to Discord webhook
        const discordResponse = await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!discordResponse.ok) {
            console.error(`Discord webhook error: ${discordResponse.status}`);
            return NextResponse.json(
                { error: 'Failed to send message' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: 'Message sent successfully' },
            { status: 200 }
        );

    } catch (error) {
        console.error('Contact form error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
