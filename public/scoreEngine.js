let calorieData = null;

export async function loadCalorieData() {
    if (calorieData) return calorieData;

    try {
        const response = await fetch('/data/calorie-data.json');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        calorieData = await response.json();
        return calorieData;
    } catch (error) {
        console.error("Using fallback calorie data", error);
        return {
            "child": {
                "sedentary": 1000,
                "moderate": [1000, 1400],
                "active": [1000, 1400]
            },
            "female": {
                "4-8": { "sedentary": 1200, "moderate": [1400, 1600], "active": [1400, 1800] },
                "9-13": { "sedentary": 1600, "moderate": [1600, 2000], "active": [1800, 2200] },
                "14-18": { "sedentary": 1800, "moderate": 2000, "active": 2400 },
                "19-30": { "sedentary": 2000, "moderate": [2000, 2200], "active": 2400 },
                "31-50": { "sedentary": 1800, "moderate": 2000, "active": 2200 },
                "51+": { "sedentary": 1600, "moderate": 1800, "active": [2000, 2200] }
            },
            "male": {
                "4-8": { "sedentary": 1400, "moderate": [1400, 1600], "active": [1600, 2000] },
                "9-13": { "sedentary": 1800, "moderate": [1800, 2200], "active": [2000, 2600] },
                "14-18": { "sedentary": 2200, "moderate": [2400, 2800], "active": [2800, 3200] },
                "19-30": { "sedentary": 2400, "moderate": [2600, 2800], "active": 3000 },
                "31-50": { "sedentary": 2200, "moderate": [2400, 2600], "active": [2800, 3000] },
                "51+": { "sedentary": 2000, "moderate": [2200, 2400], "active": [2400, 2800] }
            }
        };
    }
}

function getAgeGroup(age) {
    if (age <= 3) return "child";
    if (age <= 8) return "4-8";
    if (age <= 13) return "9-13";
    if (age <= 18) return "14-18";
    if (age <= 30) return "19-30";
    if (age <= 50) return "31-50";
    return "51+";
}

function calculateCalories(gender, ageGroup, activity, data) {
    try {
        const groupData = ageGroup === "child" ? data.child : data[gender][ageGroup];
        const value = groupData[activity];
        return Array.isArray(value)
            ? Math.round((value[0] + value[1]) / 2)
            : value;
    } catch {
        return 2000; //Default
    }
}

export async function calculateScore(params) {
    try {
        const data = await loadCalorieData();

        //Convert units
        const weightKg = params.weight * 0.453592;
        const heightM = params.height / 100;
        const bmi = weightKg / (heightM * heightM);

        //Calculate BMI score (0-10)
        let bmiScore = 10;
        if (bmi < 18.5) bmiScore -= (18.5 - bmi) * 0.7;
        else if (bmi > 24.9) bmiScore -= (bmi - 24.9) * 0.7;
        bmiScore = Math.max(0, Math.min(bmiScore, 10));

        //Calculate calorie score
        const ageGroup = getAgeGroup(params.age);
        const estimatedCalories = calculateCalories(params.gender, ageGroup, params.activity, data);
        const calorieScore = Math.min(10, Math.round(estimatedCalories / 320));

        //Calculate final score (weighted average,these params can be easily replaced)
        const score = (
            (params.satisfaction * 0.2) +
            (params.improvement * 0.15) +
            (params.sleep * 0.2) +
            (bmiScore * 0.25) +
            (calorieScore * 0.2)
        ).toFixed(2);

        return {
            score: Math.min(Math.max(parseFloat(score), 0), 10),
            breakdown: {
                bmi: bmi.toFixed(1),
                bmiScore: bmiScore.toFixed(2),
                estimatedCalories,
                calorieScore,
                sleep: params.sleep,
                satisfaction: params.satisfaction,
                improvement: params.improvement,
                ageGroup,
                gender: params.gender,
                activity: params.activity
            }
        };
    } catch (error) {
        console.error("Calculation error:", error);
        return {
            score: 0,
            breakdown: { error: "Calculation failed" }
        };
    }
}