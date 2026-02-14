
import fs from 'fs';
import path from 'path';

// Load .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
let key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, 'utf-8');
    envConfig.split('\n').forEach(line => {
        const [k, v] = line.split('=');
        if (k && v && k.trim() === 'GOOGLE_GENERATIVE_AI_API_KEY') {
            key = v.trim();
        }
    });
}


if (!key) {
    console.error("❌ No GOOGLE_GENERATIVE_AI_API_KEY found in .env.local");
    process.exit(1);
}

console.log(`🔑 key found: ${key.substring(0, 4)}...${key.substring(key.length - 4)}`);

async function testKey() {
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);

        if (!response.ok) {
            const error = await response.text();
            console.error(`❌ API Request Failed: ${response.status} ${response.statusText}`);
            console.error(`Error Body: ${error}`);
            return;
        }

        const data = await response.json();
        console.log("✅ API Connection Successful!");
        console.log("Available Models:");

        // Filter for gemini models
        const geminiModels = data.models.filter((m: any) => m.name.includes('gemini'));

        if (geminiModels.length === 0) {
            console.warn("⚠️ No 'gemini' models found in the list. This is unexpected.");
            console.log("All models:", data.models.map((m: any) => m.name));
        } else {
            geminiModels.forEach((m: any) => {
                console.log(`- ${m.name} (Methods: ${m.supportedGenerationMethods?.join(', ')})`);
            });
        }

    } catch (e: any) {
        console.error("❌ Script Error:", e.message);
    }
}

testKey();
