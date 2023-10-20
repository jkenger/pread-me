/* eslint-disable */
// @ts-nocheck

import { useState } from "react";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { aiBaseUrl } from "@/lib/constants";

const basis = `
![Banner](https://github.com/jkenger/jobify/blob/main/client/src/assets/images/banner.png?raw=true)

# Jobify: Personal Job Tracker

## Overview

Jobify is your all-in-one solution for simplifying and optimizing your job search process. Whether you're a job seeker looking for new opportunities or an employer managing applications, Jobify provides the tools you need to make the process effortless.

## Live Demo
To access the app, visit [Jobify: Personal Job Tracker](https://jobify-rl4k.onrender.com/).

## Key Features

![User Authentication](https://github.com/jkenger/jobify/blob/main/client/src/assets/images/login.png?raw=true)
- **User Authentication:** Secure login and registration functionality for user accounts.


![Admin Dashboard](https://github.com/jkenger/jobify/blob/main/client/src/assets/images/admindas.png?raw=true)
- **Admin Dashboard:** Exclusive admin access to a real-time dashboard that tracks the total number of users and job listings.


![Effortless Job Management](https://github.com/jkenger/jobify/blob/main/client/src/assets/images/add.png?raw=true)
- **Effortless Job Management:** Easily add, edit, and organize job applications. Include essential details like job position, company, location, status (pending, interview, or rejected), and job type (full-time, part-time, or internship).


![Job Listings](https://github.com/jkenger/jobify/blob/main/client/src/assets/images/AllJobs.png?raw=true)
- **Job Listings:** Conveniently view and manage job applications, categorized by status and type.


![Data Analytics](https://github.com/jkenger/jobify/blob/main/client/src/assets/images/Stats.png?raw=true)
- **Data Analytics:** Gain insights into your job search progress with a comprehensive statistics page. Monitor pending applications, scheduled interviews, and job declines. Visualize historical data with bar and area charts to track monthly applications.


![Profile Customization](https://github.com/jkenger/jobify/blob/main/client/src/assets/images/updateprofile.png?raw=true)
- **Profile Customization:** Personalize user and admin profiles by adding images and additional information.


![Admin Privileges](https://github.com/jkenger/jobify/blob/main/client/src/assets/images/admipriv.png?raw=true)
- **Admin Privileges:** Ensure exclusive admin privileges with a single admin account for streamlined control and management.

## Getting Started

To get started with Jobify, follow these simple steps:

1. **Clone the Repository:** Clone this repository to your local machine.

2. **Installation:** Install the necessary dependencies by running \`npm install\`.

3. **Configuration:** Set up your environment variables and configure your email account integration (if desired).

4. **Start the App:** Launch the application with \`npm run dev\`, and access it via your web browser.

5. **Begin Tracking:** Start adding and managing your job applications, and explore the insights offered by the statistics page.

## Credit

This project was inspired by [Jobify](https://jobify.live/), a fantastic open-source project that provided valuable insights and inspiration for building Jobify.

## Feedback and Contributions

We welcome your feedback and contributions to make Jobify even better. Feel free to open issues, submit feature requests, or contribute code to enhance the app.

## License

This project is licensed under the [MIT License](LICENSE).
`;

const prompts = {
  profile:
    "Create a profile README template for a GitHub profile. The README should serve as a professional introduction and showcase of the user's skills, interests, and contributions. Include sections for a brief bio, skills, projects, achievements, and contact information. Make sure the README is visually appealing and provides a clear and engaging overview of the user's profile. Feel free to add any relevant badges, links, or images to enhance the profile's presentation. The goal is to create a README that leaves a positive impression on visitors to the GitHub profile. Get creative and surprise us. Don't repeat the previous output, instead, make it more unique and creative.",
  documentation: `Generate a GitHub README template for a unique and creative project. Imagine you're documenting a project that stands out from the rest. The project could be anything from a whimsical art installation to an innovative software tool. Be imaginative with your layout, content, and design. Create a sample content for each section, include emojis, include an image if necessary, features must have image for each feature, text inside [] must have no spaces, replace with _. Consider including elements that would catch the eye of potential collaborators and users. The goal is to create a README template that showcases the project's uniqueness and inspires others to get involved. Get creative and surprise us. Don't repeat the previous output, instead, make it more unique and creative.
  `,
};

function useGenerateTemplate() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState(null);

  const fetchTemplates = async ({
    templateOption,
    revisePrompt = null,
    toChange = "",
  }) => {
    // Is in revision session
    const revision = revisePrompt !== null;

    // Revise prompt

    const revise = `${revisePrompt} as a same format from a github template in the previous output. ${toChange}. Act as a generator and do not return unncessary lines, as a generator you will return a markdown format.`;

    // What to prompt
    const prompt = revision ? revise : prompts[templateOption || "profile"];

    // Request an api for the prompt
    try {
      setIsLoading(true);
      setIsSuccess(false);
      const response = await axios.post(
        aiBaseUrl,
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          temparature: revision ? 0.5 : 0.7,
          n: revision ? 1 : 3,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Get the response content then set it to the templates with 3 length
      const newTemplates = revision
        ? {
            id: 1,
            content: response.data.choices[0].message.content,
          }
        : Array.from({ length: 3 }, (_, i) => ({
            id: i + 1,
            content: response.data.choices[i].message.content,
          }));

      setIsLoading(false);
      setIsSuccess(newTemplates.length > 0);
      toast({
        title: "Pread Generated",
        description: "Successfully generated templates",
      });
      // Return the newTemplates and the status
      return { newTemplates, isSuccess, isLoading, isError, error };
    } catch (error) {
      toast({
        variant: "destructive",
        title: error.code,
        description: error.message,
      });
      setIsError(true);
      setIsSuccess(false);
      setIsLoading(false);
      setError(error);
    }
  };

  return {
    fetchTemplates,
    isSuccess,
    isLoading,
    isError,
    error,
  };
}

export default useGenerateTemplate;
