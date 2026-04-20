"use client";

import Markdown from "react-markdown";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { PromptBlock } from "@/components/playbook/prompt-block";
import { rememberViewed } from "@/components/shell/recently-viewed";
import type { Step } from "@/lib/content/types";
import { cn } from "@/lib/utils";

interface StepsAccordionProps {
  playbookSlug: string;
  steps: Step[];
}

export function StepsAccordion({ playbookSlug, steps }: StepsAccordionProps) {
  return (
    <Accordion type="multiple" className="w-full">
      {steps.map((step, index) => (
        <AccordionItem
          key={`${playbookSlug}-step-${index}`}
          value={`step-${index}`}
        >
          <AccordionTrigger className="group">
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                  "bg-turquoise-sea/15 text-azure-blue group-data-[state=open]:bg-turquoise-sea group-data-[state=open]:text-white transition-colors"
                )}
              >
                {index + 1}
              </span>
              <span className="font-display text-lg text-azure-blue">
                {step.title}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pl-0 md:pl-[3.25rem] space-y-5">
              <div className="prose-gsl text-base">
                <Markdown>{step.instruction}</Markdown>
              </div>

              {step.tool ? (
                <p className="text-sm">
                  <span className="font-semibold uppercase tracking-wider text-xs text-muted-foreground mr-2">
                    Tool
                  </span>
                  <span className="text-azure-blue">{step.tool}</span>
                </p>
              ) : null}

              {step.prompt ? (
                <PromptBlock
                  onCopied={() => rememberViewed(playbookSlug)}
                  copyLabel={`Copy the prompt for step ${index + 1}`}
                >
                  {step.prompt}
                </PromptBlock>
              ) : null}

              {step.mid_flow_checks.length > 0 ? (
                <div className="rounded-xl border border-border bg-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    While you work, check
                  </p>
                  <ul className="space-y-2">
                    {step.mid_flow_checks.map((check, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm text-foreground"
                      >
                        <input
                          type="checkbox"
                          className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-turquoise-sea"
                          aria-label={check}
                        />
                        <span>{check}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {step.expected_output ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Expected output
                  </p>
                  <div className="prose-gsl text-sm">
                    <Markdown>{step.expected_output}</Markdown>
                  </div>
                </div>
              ) : null}

              {step.next_action ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Next action
                  </p>
                  <div className="prose-gsl text-sm">
                    <Markdown>{step.next_action}</Markdown>
                  </div>
                </div>
              ) : null}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
