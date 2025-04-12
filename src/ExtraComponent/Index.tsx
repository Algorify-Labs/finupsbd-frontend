

// const renderStepIndicator = () => {
//     const stepPercentage = ((step - 1) / 2) * 100
//     return (
//       <div className="relative mb-8">
//         {/* Background line */}
//         <div className="absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-gray-200 dark:bg-gray-700">
//           <div
//             className="h-full bg-green-500 transition-all duration-300"
//             style={{ width: `${stepPercentage}%` }}
//           />
//         </div>

//         {/* Circles */}
//         <div className="relative z-10 flex justify-between">
//           {[1, 2, 3].map((stepNumber) => (
//             <div
//               key={stepNumber}
//               className={cn(
//                 "flex h-8 w-8 items-center justify-center rounded-full border-2",
//                 stepNumber < step
//                   ? "border-green-500 bg-green-500 text-white"
//                   : stepNumber === step
//                     ? "border-green-500"
//                     : "border-gray-200"
//               )}
//             >
//               {stepNumber < step ? (
//                 <Check className="h-4 w-4" />
//               ) : (
//                 <span>{stepNumber}</span>
//               )}
//             </div>
//           ))}
//         </div>

//         {/* Labels */}
//         <div className="mt-2 flex justify-between text-sm">
//           <span
//             className={cn(
//               step >= 1 ? "text-green-600 font-medium" : "text-gray-500"
//             )}
//           >
//             Step 1
//           </span>
//           <span
//             className={cn(
//               step >= 2 ? "text-green-600 font-medium" : "text-gray-500"
//             )}
//           >
//             Step 2
//           </span>
//           <span
//             className={cn(
//               step >= 3 ? "text-green-600 font-medium" : "text-gray-500"
//             )}
//           >
//             Step 3
//           </span>
//         </div>
//       </div>
//     )
//   }