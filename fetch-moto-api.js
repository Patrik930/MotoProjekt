export async function fetchMotorcycles(render, make, model) {
    try {
        const response = await fetch(`https://api.api-ninjas.com/v1/motorcycles?make=${make}&model=${model}`, {
            method: 'GET',
            headers: {
                'X-Api-Key': 'T5cqy7FBK3Cw/1U8qaBYtw==rcmdKF3RbIc1b2tt',
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const result = await response.json();
        render(result)
    } catch (error) {
        console.error('Fetch Error:', error);
    }
}

// fetchMotorcycles("kawasaki", "ninja");