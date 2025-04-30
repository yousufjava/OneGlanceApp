# One Glance

**One Glance** is a minimalist health tracking app designed to simplify where your health stands—at a glance.

---

## 🧭 Why One Glance?

> “I started this idea with the purpose of simplifying where your health stands compared to the general population. Health apps today often overwhelm users with data, creating a high barrier to entry for everyday people.

This app aims to reduce that friction by providing a single, digestible wellness metric. Users can expand into more details only if they choose to—making the experience empowering instead of overwhelming.

I’ve intentionally structured the app to be scalable, with future plans to integrate Apple and Google Health APIs, and to use LLMs for personalized recommendations that feel human, not robotic.

A great deal of time has gone into crafting a minimalist landing page, calming animations, and intuitive interactions to create an inviting, non-judgmental space to reflect on your well-being.

There’s still much to build, but this is the foundation I’m proud to share.

— *Yousuf Saquib* | *April 30, 2025 — v0.1*
# First Glance

**First Glance** is a minimalist health-check app designed to simplify how users understand their well-being. Instead of overwhelming users with charts and data, it generates a single wellness score from basic inputs — giving an instant snapshot of health, with the option to explore areas for improvement.

---

## 🧭 Why First Glance?

> I started this idea with the purpose of simplifying where your health stands compared to the general population. Health apps today often overwhelm users with data, creating a high barrier to entry for everyday people.

This app reduces that friction by offering one clear metric based on general wellness indicators. Users can choose to explore deeper insights if they want to — not because they're forced to.

The structure of the codebase leaves room for integrating third-party APIs such as Apple Health or Google Fit. Future iterations will use an LLM to provide personalized recommendations, and make the experience more supportive, inviting, and intelligent.

A lot of care went into building a minimalist landing page with calming transitions, smooth animations, and responsive interactivity — striking the balance between useful and peaceful.

There’s still much to build, but this is the foundation I’m proud to share.

— *Yousuf Saquib* | *April 30, 2025 — v0.1*

---

## 🛠 Technical Overview

**First Glance** is a lightweight, modular React web app focused on intuitive UX and extensibility.

### 🔧 Current Features

- User inputs for:
  - Age, gender,height, weight
  - Sleep hours
  - Calorie intake
  - Satisfaction (subjective self-rating), Desired Improvement
- Instant calculation of a **wellness score** based on custom logic
- Visual cues to show strong/weak areas
- Minimalist UI/UX using **React** + **Tailwind CSS**
- Smooth transitions and interactions

### 🚧 Planned Features

- **Nutrition Recommendations**:
  - Use **Nutritionix API** to retrieve food data
  - Use **OpenAI's LLM** to generate diet suggestions based on user goals and current habits
  - Tailor advice to feel conversational, not clinical

- **Health API Integration**:
  - Future support for **Apple Health** and **Google Fit**
  - Enable auto-syncing of sleep, activity, and calorie data

- **AI-Powered Coaching**:
  - Friendly guidance on areas for improvement
  - Weekly summaries and suggestions via chat or dashboard

---

## 🧮 How the Score Works

- Inputs are normalized and weighted by impact:
  - BMI approximation from height/weight
  - Sleep hours (vs recommended range)
  - Calorie intake vs baseline needs
  - Self-reported satisfaction
- A single score (0–100) is calculated to indicate general wellness
- Optional breakdown shows where the score was most affected

---

## 🚀 Getting Started
```bash
git clone https://github.com/yousufjava/OneGlanceApp.git
cd OneGlanceApp
open FGweb.html      # Mac
start FGweb.html     # Windows
xdg-open FGweb.html  # Linux
