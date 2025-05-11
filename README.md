# One Glance

A minimalist health tracking app designed to simplify where your health stands at a glance.

## 🌐 Live Demo

Check out the live application: [One Glance App](https://one-glance-app-dmln.vercel.app/)

## 🧭 Why One Glance?

> "I started this idea with the purpose of simplifying where your health stands compared to the general population. Health apps today often overwhelm users with data, creating a high barrier to entry for everyday people.

This app aims to reduce that friction by providing a single, digestible wellness metric. Users can expand into more details only if they choose to making the experience empowering instead of overwhelming.

## 🛠 Technical Overview

**One Glance** is a lightweight, modular web app focused on intuitive UX and extensibility.

### 🔧 Current Features

* User inputs for:  
   * Age, gender, height, weight  
   * Sleep hours  
   * Calorie intake  
   * Satisfaction (subjective self-rating), Desired Improvement
* Instant calculation of a **wellness score** based on custom logic
* Visual cues to show strong/weak areas
* Minimalist UI/UX with smooth transitions and interactions

### 🚧 Planned Features

* **Nutrition Recommendations**:  
   * Use **Nutritionix API** to retrieve food data  
   * Use **OpenAI's LLM** to generate diet suggestions based on user goals and current habits  
   * Tailor advice to feel conversational, not clinical
* **Health API Integration**:  
   * Future support for **Apple Health** and **Google Fit**  
   * Enable auto-syncing of sleep, activity, and calorie data
* **AI-Powered Coaching**:  
   * Friendly guidance on areas for improvement  
   * Weekly summaries and suggestions via chat or dashboard

## 🚀 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/yousufjava/OneGlanceApp.git
cd OneGlanceApp
```

2. Open the application:
```bash
# Mac
open public/index.html

# Windows
start public/index.html

# Linux
xdg-open public/index.html
```

## 🚀 Deployment

This project is configured for deployment on Vercel. To deploy:

1. Install the Vercel CLI:
```bash
npm install -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy the project:
```bash
vercel
```

For production deployment:
```bash
vercel --prod
```

## 📦 Project Structure

- `public/` - Contains all static assets
  - HTML files
  - CSS files
  - JavaScript files
  - Media files
  - Data files

## 🧮 How the Score Works

* Inputs are normalized and weighted by impact:  
  * BMI approximation from height/weight  
  * Sleep hours (vs recommended range)  
  * Calorie intake vs baseline needs  
  * Self-reported satisfaction
* A single score (0–10) is calculated to indicate general wellness
* Optional breakdown shows where the score was most affected

## 📝 License

This project is open source and available under the MIT License.

## 👤 Author

**Yousuf Saquib**
- GitHub: [@yousufjava](https://github.com/yousufjava) 