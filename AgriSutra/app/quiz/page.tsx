// "use client";

// import React, { useState, useEffect } from "react";
// import { ArrowLeft } from "lucide-react";
// interface FormData {
//   N: string;
//   P: string;
//   K: string;
//   temperature: string;
//   humidity: string;
//   ph: string;
//   rainfall: string;
// }

// interface ResultType {
//   recommendedCrop: string;
//   description: string;
//   tips?: string[];
// }

// export default function QuizPage() {
//   const [formData, setFormData] = useState<FormData>({
//     N: "",
//     P: "",
//     K: "",
//     temperature: "",
//     humidity: "",
//     ph: "",
//     rainfall: "",
//   });

//   const [result, setResult] = useState<ResultType | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [apiUrl, setApiUrl] = useState<string | null>(null);
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setApiUrl(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001");
//     setIsClient(true);
//   }, []);

//   if (!isClient) {
//     return <div className="container mx-auto p-6">Loading...</div>;
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setError(null);
//     setResult(null);

//     if (!apiUrl) {
//       setError("API URL not available");
//       return;
//     }

//     try {
//       const response = await fetch(`${apiUrl}/api/seeds/predict`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           N: Number(formData.N),
//           P: Number(formData.P),
//           K: Number(formData.K),
//           temperature: Number(formData.temperature),
//           humidity: Number(formData.humidity),
//           ph: Number(formData.ph),
//           rainfall: Number(formData.rainfall),
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(
//           (await response.text()) || "Failed to fetch prediction"
//         );
//       }

//       const data: ResultType = await response.json();
//       setResult(data);
//     } catch (err) {
//       setError(
//         (err as Error).message || "Error fetching prediction. Please try again."
//       );
//     }
//   };

//   return (
//     <main className="container mx-auto px-4 py-6">
//       {/* Optional nav link back to home */}
//       <div className="mb-4">
//         <a
//           href="/"
//           className="inline-flex items-center text-sm text-green-700 hover:text-green-800"
//         >
//           <svg
//             className="h-5 w-5 mr-1"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth={2}
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>
//           Soil Analysis Test
//         </a>
//       </div>

//       {/* Form card with green border */}
//       <div className="bg-white border border-green-400 rounded-lg shadow-md p-6 mb-6">
//         <h1 className="text-xl font-bold mb-2 text-green-700">Soil Analysis</h1>
//         <p className="text-sm text-gray-600 mb-4">
//           Enter your soil parameters and environmental conditions to get a
//           personalized crop recommendation.
//         </p>

//         <form
//           onSubmit={handleSubmit}
//           className="grid grid-cols-1 sm:grid-cols-2 gap-4"
//         >
//           {["N", "P", "K", "temperature", "humidity", "ph", "rainfall"].map(
//             (param) => (
//               <div key={param}>
//                 <label
//                   className="block font-medium text-sm mb-1"
//                   htmlFor={param}
//                 >
//                   {param.charAt(0).toUpperCase() + param.slice(1)}
//                 </label>
//                 <input
//                   id={param}
//                   name={param}
//                   type="number"
//                   value={formData[param as keyof FormData]}
//                   onChange={handleChange}
//                   className="border border-gray-300 rounded w-full p-2 focus:border-green-500 focus:ring focus:ring-green-200 transition"
//                   required
//                 />
//                 <p className="text-xs text-gray-400">
//                   {param === "ph"
//                     ? "pH value of soil (3.5-10)"
//                     : param === "temperature"
//                     ? "Average temperature in Celsius (8-44)"
//                     : param === "humidity"
//                     ? "Relative humidity (14-100)"
//                     : param === "rainfall"
//                     ? "Annual rainfall in mm (20-300)"
//                     : `Soil content range`}
//                 </p>
//               </div>
//             )
//           )}

//           {/* Submit button */}
//           <div className="sm:col-span-2 mt-2">
//             <button
//               type="submit"
//               className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition-colors"
//             >
//               Get Recommendation
//             </button>
//           </div>
//         </form>

//         {/* Error display */}
//         {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}
//       </div>

//       {/* Result card with green border */}
//       {result && (
//         <div className="bg-white border border-green-400 rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-bold text-green-700 mb-2">
//             Crop Recommendation
//           </h2>
//           <h3 className="text-lg font-semibold mb-2">
//             {result.recommendedCrop}
//           </h3>
//           <p className="text-sm text-gray-700 mb-4">
//             {result.description || "No description available."}
//           </p>
//           {result.tips && result.tips.length > 0 && (
//             <div>
//               <h4 className="font-medium mb-2">Growing Tips:</h4>
//               <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
//                 {result.tips.map((tip, index) => (
//                   <li key={index}>{tip}</li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       )}
//     </main>
//   );
// }



"use client";

import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";

interface FormData {
  N: string;
  P: string;
  K: string;
  temperature: string;
  humidity: string;
  ph: string;
  rainfall: string;
  file?: File | null;
}

interface ResultType {
  recommendedCrop: string;
  description: string;
  extractedText?: string;
  tips?: string[];
}

export default function QuizPage() {
  const [inputMethod, setInputMethod] = useState<"manual" | "file">("manual"); // Toggle state
  const [formData, setFormData] = useState<FormData>({
    N: "",
    P: "",
    K: "",
    temperature: "",
    humidity: "",
    ph: "",
    rainfall: "",
    file: null,
  });

  const [result, setResult] = useState<ResultType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [apiUrl, setApiUrl] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setApiUrl(process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001");
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "file") {
      setFormData({ ...formData, file: e.target.files?.[0] || null });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    if (!apiUrl) {
      setError("API URL not available");
      return;
    }

    try {
      const formDataToSend = new FormData();

      if (inputMethod === "manual") {
        formDataToSend.append("N", formData.N);
        formDataToSend.append("P", formData.P);
        formDataToSend.append("K", formData.K);
        formDataToSend.append("temperature", formData.temperature);
        formDataToSend.append("humidity", formData.humidity);
        formDataToSend.append("ph", formData.ph);
        formDataToSend.append("rainfall", formData.rainfall);
      }

      if (formData.file) {
        formDataToSend.append("file", formData.file);
      }

      const response = await fetch(`${apiUrl}/api/seeds/predict`, {
        method: "POST",
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(await response.text() || "Failed to fetch prediction");
      }

      const data: ResultType = await response.json();
      setResult(data);
    } catch (err) {
      setError((err as Error).message || "Error fetching prediction. Please try again.");
    }
  };

  return (
    <main className="container mx-auto px-4 py-6">
      {/* Back Link with Larger Bold Text */}
      <div className="mb-6">
        <a href="/" className="inline-flex items-center text-lg font-bold text-green-700 hover:text-green-800">
          <ArrowLeft className="h-6 w-6 mr-2" />
          <span className="text-3xl font-extrabold">Soil Analysis Test</span>
        </a>
      </div>

      {/* Form card with increased spacing */}
      <div className="bg-white border border-green-400 rounded-lg shadow-md p-6 mb-12 mt-8">
        <h1 className="text-2xl font-bold mb-4 text-green-700">Soil Analysis</h1>
        <p className="text-md text-gray-600 mb-6">
          Choose whether to manually enter the soil parameters or upload a PDF/Image.
        </p>

        {/* Toggle between Manual Input and File Upload */}
        <div className="flex gap-4 mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="manual"
              checked={inputMethod === "manual"}
              onChange={() => setInputMethod("manual")}
              className="form-radio text-green-600"
            />
            <span className="text-sm text-gray-700">Manual Input</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="file"
              checked={inputMethod === "file"}
              onChange={() => setInputMethod("file")}
              className="form-radio text-green-600"
            />
            <span className="text-sm text-gray-700">Upload PDF/Image</span>
          </label>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {inputMethod === "manual" &&
            ["N", "P", "K", "temperature", "humidity", "ph", "rainfall"].map((param) => (
              <div key={param}>
                <label className="block font-medium text-sm mb-1" htmlFor={param}>
                  {param.charAt(0).toUpperCase() + param.slice(1)}
                </label>
                <input
                  id={param}
                  name={param}
                  type="number"
                  value={formData[param as keyof FormData]}
                  onChange={handleChange}
                  className="border border-gray-300 rounded w-full p-2 focus:border-green-500 focus:ring focus:ring-green-200 transition"
                  required
                />
              </div>
            ))}

          {inputMethod === "file" && (
            <div className="sm:col-span-2">
              <label className="block font-medium text-sm mb-1">Upload Image or PDF</label>
              <input
                type="file"
                accept=".pdf, image/*"
                onChange={handleChange}
                className="border border-gray-300 rounded w-full p-2"
                required
              />
            </div>
          )}

          {/* Submit button */}
          <div className="sm:col-span-2 mt-2">
            <button
              type="submit"
              className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition-colors"
            >
              Get Recommendation
            </button>
          </div>
        </form>

        {/* Error display */}
        {error && <p className="text-red-600 mt-4 text-sm">{error}</p>}
      </div>

      {/* Result card */}
      {result && (
        <div className="bg-white border border-green-400 rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-green-700 mb-2">Crop Recommendation</h2>
          <h3 className="text-lg font-semibold mb-2">{result.recommendedCrop}</h3>
          <p className="text-sm text-gray-700 mb-4">{result.description || "No description available."}</p>

          {/* {result.extractedText && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Extracted Text from File:</h4>
              <p className="text-sm text-gray-700 bg-gray-100 p-3 rounded">{result.extractedText}</p>
            </div>
          )} */}
        </div>
      )}
    </main>
  );
}
