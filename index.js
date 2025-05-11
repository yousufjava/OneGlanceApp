import { calculateScore } from './scoreEngine.js';

const prompts = document.querySelectorAll('.prompt');
let currentPrompt = 0;

//Initialize sliders(inspo CodingDesign YT)
function initSliders() {
    document.querySelectorAll('input[type="range"]').forEach(slider => {
        const valueDisplay = document.getElementById(`${slider.id}-value`);
        if (valueDisplay) valueDisplay.textContent = slider.value;

        //Update fill and value display
        const updateSlider = () => {
            const percent = (slider.value - slider.min) / (slider.max - slider.min) * 100;
            slider.style.setProperty('--fill-percent', `${percent}%`);

            if (valueDisplay) {
                valueDisplay.textContent = slider.value;
                valueDisplay.style.transform = 'scale(1.2)';
                setTimeout(() => valueDisplay.style.transform = 'scale(1)', 150);
            }
        };

        slider.addEventListener('input', updateSlider);
        slider.addEventListener('change', updateSlider);
        updateSlider(); //Initialize
    });
}

function nextPrompt() {
    const current = prompts[currentPrompt];

    //Handle Errors
    const numberInputs = current.querySelectorAll('input[type="number"]');
    for (let input of numberInputs) {
        const errorEl = document.getElementById(`${input.id}-error`);
        const value = parseInt(input.value);

        if (!value || isNaN(value)) {
            errorEl.textContent = `Please enter a valid ${input.placeholder.toLowerCase()}`;
            return;
        }

        //Specific validation desires(you can change if suited)
        if (input.id === 'age' && (value < 1 || value > 100)) {
            errorEl.textContent = "Age must be between 1-100";
            return;
        }
        if (input.id === 'height' && (value < 50 || value > 300)) {
            errorEl.textContent = "Height must be 50-300 cm";
            return;
        }
        if (input.id === 'weight' && (value < 20 || value > 600)) {
            errorEl.textContent = "Weight must be 20-600 lbs";
            return;
        }
        errorEl.textContent = '';
    }

    //Transition to next prompt
    prompts[currentPrompt].classList.remove('active');
    currentPrompt++;

    if (currentPrompt < prompts.length) {
        prompts[currentPrompt].classList.add('active');
        //Special initialization for score display
        if (prompts[currentPrompt].id === 'prompt-score') {
            calculateAndDisplayScore();
        }
    }
}
//Assigning inputs to variables
async function calculateAndDisplayScore() {
    try {
        const inputs = {
            satisfaction: parseInt(document.getElementById('satisfaction').value),
            improvement: parseInt(document.getElementById('improvement').value),
            age: parseInt(document.getElementById('age').value),
            height: parseInt(document.getElementById('height').value),
            weight: parseInt(document.getElementById('weight').value),
            sleep: parseInt(document.getElementById('sleep').value),
            gender: document.getElementById('gender').value,
            activity: document.getElementById('activity').value,
            calories: parseInt(document.getElementById('calories').value)
        };

        const result = await calculateScore(inputs);
//interactive HTML codes down
        // Display results
        document.getElementById('score-result').textContent = result.score;
        document.getElementById('breakdown-details').innerHTML = createBreakdownHTML(result.breakdown);

        // Animation for circle
        const scoreCircle = document.getElementById('score-circle');
        scoreCircle.style.animation = 'none';
        setTimeout(() => {
            scoreCircle.style.animation = 'gentlePulse 3s infinite ease-in-out';
        }, 10);

    } catch (error) {
        console.error("Score calculation failed:", error);
        document.getElementById('score-result').textContent = "0.00";
        document.getElementById('breakdown-details').innerHTML = `
      <p class="error">Could not calculate score</p>
    `;
    }
}
//Breakdown box(placed here not FGweb for debug and expansion purposes)
function createBreakdownHTML(breakdown) {
    return `
    <div class="breakdown-item highlight">
      <span class="breakdown-label">BMI</span>
      <span class="breakdown-value">${breakdown.bmi} <small>(${breakdown.bmiScore}/10)</small></span>
    </div>
    <div class="breakdown-item">
      <span class="breakdown-label">Recommended Calories</span>
      <span class="breakdown-value">${breakdown.estimatedCalories}</span>
    </div>
    <div class="breakdown-item">
      <span class="breakdown-label">Nutrition</span>
      <span class="breakdown-value">${breakdown.calorieScore}/10</span>
    </div>
    <div class="breakdown-item highlight">
      <span class="breakdown-label">Sleep Quality</span>
      <span class="breakdown-value">${breakdown.sleep}/10</span>
    </div>
    <div class="breakdown-item">
      <span class="breakdown-label">Satisfaction</span>
      <span class="breakdown-value">${breakdown.satisfaction}/10</span>
    </div>
    <div class="breakdown-item">
      <span class="breakdown-label">Motivation</span>
      <span class="breakdown-value">${breakdown.improvement}/10</span>
    </div>
  `;
}
// Reset all inputs
function resetApp() {
    prompts[currentPrompt].classList.remove('active');
    currentPrompt = 0;
    prompts[0].classList.add('active');

    document.querySelectorAll('input').forEach(input => {
        if (input.type === 'number') input.value = '';
        if (input.type === 'range') {
            input.value = input.defaultValue;
            const valueDisplay = document.getElementById(`${input.id}-value`);
            if (valueDisplay) valueDisplay.textContent = input.defaultValue;
        }
    });

    document.getElementById('gender').value = 'male';
    document.getElementById('activity').value = 'sedentary';
}

// Initializes the app
document.addEventListener('DOMContentLoaded', () => {
    initSliders();
    document.addEventListener('DOMContentLoaded', function() {
        const breakdownSection = document.getElementById('score-breakdown');

        if (breakdownSection) {
            breakdownSection.classList.add('collapsed');

            breakdownSection.addEventListener('click', function(e) {
                // Only toggle if clicking on the header or its children
                if (e.target.closest('h3') || e.target === breakdownSection) {
                    this.classList.toggle('collapsed');
                    this.classList.toggle('expanded');
                }
            });
        }
    });
    // Makes functions streamlined
    window.nextPrompt = nextPrompt;
    window.resetApp = resetApp;
    window.calculateAndDisplayScore = calculateAndDisplayScore;
});