import { Users, Building2 } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SegmentedToggle } from "@/components/ui/segmented-toggle";

export default function MiniModeToggle({ 
  mode, 
  onModeChange, 
  isVisible,
  isRTL 
}: { 
  mode: string; 
  onModeChange: (mode: "customer" | "business") => void;
  isVisible: boolean;
  isRTL: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className="flex items-center">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="mini-toggle"
            initial={{ opacity: 0, y: -8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.9 }}
            transition={{ 
              duration: prefersReducedMotion ? 0 : 0.25, 
              ease: [0.22, 0.6, 0.2, 1] 
            }}
            className={isRTL ? "ml-2" : "mr-2"}
          >
            <SegmentedToggle
              value={mode}
              onChange={(v) => onModeChange(v as "customer" | "business")}
              options={[
                {
                  value: "customer",
                  label: (
                    <span className="inline-flex items-center justify-center">
                      <Users size={16} />
                      <span className="sr-only">Customer</span>
                    </span>
                  ),
                },
                {
                  value: "business",
                  label: (
                    <span className="inline-flex items-center justify-center">
                      <Building2 size={16} />
                      <span className="sr-only">Business</span>
                    </span>
                  ),
                },
              ]}
              className="h-8 shadow-md mini-toggle"
              dir={isRTL ? "rtl" : "ltr"}
              compact={true}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}