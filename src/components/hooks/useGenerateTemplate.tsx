import { useState } from "react";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { aiBaseUrl } from "@/lib/constants";

function useGenerateTemplate() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({ code: "", message: "" });

  // V1
  // const fetchTemplates = async ({
  //   selectedContent,
  //   isRevision,
  //   revisePrompt,
  //   previousOutput,
  //   toChange,
  // }) => {
  //   const revision = isRevision ? isRevision : false;
  //   const revise = `${revisePrompt} in ${previousOutput} where ${toChange} is located and return it as revised ${previousOutput} in a markdown format.`;
  //   const prompt = revision
  //     ? revise
  //     : prompts[selectedTemplateOption || "profile"];
  //   console.log(prompt);
  //   try {
  //     setIsLoading(true);
  //     setIsSuccess(false);
  //     const response = await axios.post(
  //       aiBaseUrl,
  //       {
  //         model: "gpt-3.5-turbo",
  //         messages: [
  //           {
  //             role: "user",
  //             content: prompt,
  //           },
  //         ],
  //         temparature: isRevision ? 0.5 : 0.7,
  //         n: 3,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     const newTemplates = Array.from({ length: 3 }, (_, i) => ({
  //       id: i + 1,
  //       content: response.data.choices[i].message.content,
  //     }));

  //     setIsLoading(false);
  //     setIsSuccess(newTemplates.length > 0);
  //     toast({
  //       title: "Pread Generated",
  //       description: "Successfully generated templates",
  //     });
  //     return { newTemplates, isSuccess, isLoading, isError, error };
  //   } catch (error) {
  //     toast({
  //       variant: "destructive",
  //       title: error.code,
  //       description: error.message,
  //     });
  //     setIsError(true);
  //     setIsSuccess(false);
  //     setIsLoading(false);
  //     setError(error);
  //   }
  // };

  const fetchTemplates = async (selectedContent: string) => {
    const prompt = `${selectedContent} \n\n Above is a readme markdown template, read it and generate alternative format in markdown format.`;

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
          temparature: 0.7,
          n: 3,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const newTemplates = Array.from({ length: 3 }, (_, i) => ({
        id: i + 1,
        content: response.data.choices[i].message.content,
      }));

      setIsLoading(false);
      setIsSuccess(newTemplates.length > 0);
      toast({
        title: "Pread Generated",
        description: "Successfully generated templates",
      });
      return { newTemplates, isSuccess, isLoading, isError, error };
    } catch (err) {
      const error = err as { code: string; message: string };
      toast({
        variant: "destructive",
        title: error.code,
        description: error.message,
      });
      setIsError(true);
      setIsSuccess(false);
      setIsLoading(false);
      setError(error);
      return { isSuccess, isLoading, isError, error };
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
