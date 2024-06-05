"use client";
 
import * as React from "react";
import { type Locale, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../../../@/lib/utils";
import { Button } from "./button";
import { Calendar } from "./calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TimePickerDemo } from "./time-picker";
import ptLocale from 'date-fns/locale/pt';
 
export function DateTimePicker() {
  const [date, setDate] = React.useState<Date>();
 
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "col-span-3 justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP HH:mm", { locale: ptLocale as unknown as Locale }) : <span>Escolha uma data</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 absolute -right-16 -top-14 overflow-scroll" style={{maxHeight: "250px", scrollbarWidth:"thin" }}>
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          lang="pt"
          locale={ptLocale as unknown as Locale}
          initialFocus
        />
        <div className="p-3 border-t border-border">
          <TimePickerDemo setDate={setDate} date={date} />
        </div>
      </PopoverContent>
    </Popover>
  );
}