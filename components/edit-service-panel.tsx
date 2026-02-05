// 'use client';

// import { useDashboardStore } from '@/store/dashboardStore';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { X, Upload } from 'lucide-react';
// import { useState } from 'react';

// export function EditServicePanel() {
//   const { editingServiceId, setEditingServiceId, services, updateService } = useDashboardStore();

//   const service = services.find((s) => s.id === editingServiceId);
//   const [title, setTitle] = useState(service?.name || '');
//   const [description, setDescription] = useState(service?.description || '');
//   const [price, setPrice] = useState(service?.price.toString() || '');
//   const [duration, setDuration] = useState(service?.duration || '');
//   const [offerings, setOfferings] = useState<string[]>([
//     'Company Secretary Services',
//     'Company Branding Services',
//     'Annual Filing & Compliance',
//     'Yearly Filing / Compliance'
//   ]);

//   const handleSave = () => {
//     if (editingServiceId) {
//       updateService(editingServiceId, {
//         name: title,
//         description,
//         duration
//       });
//       setEditingServiceId(null);
//     }
//   };

//   if (!editingServiceId || !service) return null;

//   return (
//     <div className="fixed right-0 top-0 h-screen w-96 bg-background border-l border-border shadow-lg overflow-y-auto">
//       {/* Header */}
//       <div className="sticky top-0 flex items-center justify-between p-6 border-b border-border bg-background">
//         <h2 className="text-lg font-semibold">Edit Service</h2>
//         <button
//           onClick={() => setEditingServiceId(null)}
//           className="p-1 hover:bg-muted rounded-md transition-colors"
//         >
//           <X className="h-5 w-5" />
//         </button>
//       </div>

//       {/* Content */}
//       <div className="p-6 space-y-6">
//         {/* Title */}
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-foreground">Title</label>
//           <Input
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Service title"
//             className="h-10"
//           />
//         </div>

//         {/* Image Upload */}
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-foreground">Service Image</label>
//           <div className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-muted/50 transition-colors">
//             <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
//             <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
//           </div>
//         </div>

//         {/* Description */}
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-foreground">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             placeholder="Describe your service"
//             className="w-full h-24 px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//           />
//         </div>

//         {/* Estimated Completion Time */}
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-foreground">Estimated Completion Time</label>
//           <Input
//             value={duration}
//             onChange={(e) => setDuration(e.target.value)}
//             placeholder="e.g., 3 Days"
//             className="h-10"
//           />
//         </div>

//         {/* Price */}
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-foreground">Price</label>
//           <div className="flex items-center gap-2">
//             <span className="text-foreground font-medium">RM</span>
//             <Input
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               placeholder="0.00"
//               className="h-10"
//             />
//           </div>
//         </div>

//         {/* Additional Offerings */}
//         <div className="space-y-3">
//           <label className="text-sm font-medium text-foreground">Additional Offerings</label>
//           <div className="space-y-2">
//             {offerings.map((offering, idx) => (
//               <div key={idx} className="flex items-center gap-3">
//                 <input
//                   type="checkbox"
//                   id={`offering-${idx}`}
//                   defaultChecked
//                   className="h-4 w-4 rounded border-border"
//                 />
//                 <label htmlFor={`offering-${idx}`} className="text-sm text-foreground cursor-pointer">
//                   {offering}
//                 </label>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Action Buttons */}
//         <div className="flex gap-2 pt-6 border-t border-border">
//           <Button
//             variant="outline"
//             onClick={() => setEditingServiceId(null)}
//             className="flex-1"
//           >
//             Cancel
//           </Button>
//           <Button onClick={handleSave} className="flex-1 bg-primary text-primary-foreground">
//             Save
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }
