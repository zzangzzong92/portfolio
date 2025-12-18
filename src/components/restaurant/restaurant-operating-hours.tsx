"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import React, { useState } from "react";

interface OperatingHour {
  dayOfWeek: number;
  openTime?: string;
  closeTime?: string;
  breakStartTime?: string;
  breakEndTime?: string;
  isClosedAllDay?: boolean;
  hasBreakTime?: boolean; // 브레이크타임 여부
}

interface OperatingHoursFormProps {
  operatingHours: OperatingHour[];
  onChange: (hours: OperatingHour[]) => void;
}

const WEEK_DAYS = [
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
  "일요일",
];

export default function RestaurantOperatingHours({
  operatingHours,
  onChange,
}: OperatingHoursFormProps) {
  const [localHours, setLocalHours] = useState<OperatingHour[]>(operatingHours);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bulkData, setBulkData] = useState({
    openTime: "11:00",
    closeTime: "22:00",
    breakStartTime: "15:00",
    breakEndTime: "17:00",
    hasBreakTime: true,
  });

  const handleHourChange = (
    dayIndex: number,
    field: keyof OperatingHour,
    value: any
  ) => {
    const newHours = [...localHours];
    newHours[dayIndex] = { ...newHours[dayIndex], [field]: value };
    setLocalHours(newHours);
    onChange(newHours);
  };

  const handleCheckboxChange = (dayIndex: number, checked: boolean) => {
    const newHours = [...localHours];
    newHours[dayIndex] = {
      ...newHours[dayIndex],
      isClosedAllDay: checked,
      openTime: checked ? undefined : newHours[dayIndex].openTime || "11:00",
      closeTime: checked ? undefined : newHours[dayIndex].closeTime || "22:00",
      breakStartTime: checked
        ? undefined
        : newHours[dayIndex].breakStartTime || "15:00",
      breakEndTime: checked
        ? undefined
        : newHours[dayIndex].breakEndTime || "17:00",
    };
    setLocalHours(newHours);
    onChange(newHours);
  };

  const handleBreakTimeChange = (dayIndex: number, hasBreakTime: boolean) => {
    const newHours = [...localHours];
    newHours[dayIndex] = {
      ...newHours[dayIndex],
      hasBreakTime,
      breakStartTime: hasBreakTime
        ? newHours[dayIndex].breakStartTime || "15:00"
        : undefined,
      breakEndTime: hasBreakTime
        ? newHours[dayIndex].breakEndTime || "17:00"
        : undefined,
    };
    setLocalHours(newHours);
    onChange(newHours);
  };

  const handleBulkChange = (field: string, value: string) => {
    setBulkData((prev) => ({ ...prev, [field]: value }));
  };

  const applyBulkHours = () => {
    const newHours = localHours.map((hour, index) => ({
      ...hour,
      openTime: bulkData.openTime,
      closeTime: bulkData.closeTime,
      hasBreakTime: bulkData.hasBreakTime,
      breakStartTime: bulkData.hasBreakTime
        ? bulkData.breakStartTime
        : undefined,
      breakEndTime: bulkData.hasBreakTime ? bulkData.breakEndTime : undefined,
      isClosedAllDay: index === 6, // 일요일은 기본적으로 휴무
    }));
    setLocalHours(newHours);
    onChange(newHours);
    setDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer border-white/30 bg-white/20 backdrop-blur-sm hover:border-white/50 hover:bg-white/30"
            >
              시간 일괄 등록
            </Button>
          </DialogTrigger>
          <DialogContent className="border-white/20 bg-white/10 backdrop-blur-md">
            <DialogHeader>
              <DialogTitle className="text-gray-800">
                운영시간 일괄 등록
              </DialogTitle>
              <DialogDescription className="text-gray-600">
                모든 요일에 동일한 운영시간을 적용합니다.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="bulkOpenTime">영업 시작 시간</Label>
                  <Input
                    id="bulkOpenTime"
                    type="time"
                    value={bulkData.openTime}
                    onChange={(e) =>
                      handleBulkChange("openTime", e.target.value)
                    }
                    className="border-white/30 bg-white/20 backdrop-blur-sm placeholder:text-gray-500 focus:border-blue-400/50 focus:bg-white/30"
                  />
                </div>
                <div>
                  <Label htmlFor="bulkCloseTime">영업 종료 시간</Label>
                  <Input
                    id="bulkCloseTime"
                    type="time"
                    value={bulkData.closeTime}
                    onChange={(e) =>
                      handleBulkChange("closeTime", e.target.value)
                    }
                    className="border-white/30 bg-white/20 backdrop-blur-sm placeholder:text-gray-500 focus:border-blue-400/50 focus:bg-white/30"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded border-2 backdrop-blur-sm transition-all duration-200 ${
                      bulkData.hasBreakTime
                        ? "border-blue-600 bg-blue-500 shadow-lg shadow-blue-500/30"
                        : "border-gray-400 bg-white/40 hover:border-gray-500 hover:bg-white/60"
                    }`}
                    onClick={() =>
                      setBulkData((prev) => ({
                        ...prev,
                        hasBreakTime: !prev.hasBreakTime,
                      }))
                    }
                  >
                    {bulkData.hasBreakTime && (
                      <div className="h-3 w-3 rounded-full bg-white shadow-sm"></div>
                    )}
                  </div>
                  <Label htmlFor="bulkBreakTime" className="text-sm">
                    브레이크타임 설정
                  </Label>
                </div>
                {bulkData.hasBreakTime && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bulkBreakStart">브레이크 시작 시간</Label>
                      <Input
                        id="bulkBreakStart"
                        type="time"
                        value={bulkData.breakStartTime}
                        onChange={(e) =>
                          handleBulkChange("breakStartTime", e.target.value)
                        }
                        className="border-white/30 bg-white/20 backdrop-blur-sm placeholder:text-gray-500 focus:border-blue-400/50 focus:bg-white/30"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bulkBreakEnd">브레이크 종료 시간</Label>
                      <Input
                        id="bulkBreakEnd"
                        type="time"
                        value={bulkData.breakEndTime}
                        onChange={(e) =>
                          handleBulkChange("breakEndTime", e.target.value)
                        }
                        className="border-white/30 bg-white/20 backdrop-blur-sm placeholder:text-gray-500 focus:border-blue-400/50 focus:bg-white/30"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <Button
              onClick={applyBulkHours}
              className="border-white/30 bg-white/20 backdrop-blur-sm hover:border-white/50 hover:bg-white/30"
            >
              확인
            </Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {localHours.map((hour, index) => (
          <React.Fragment key={index}>
            <div className="flex items-center space-x-4">
              <Label className="w-16 shrink-0">{WEEK_DAYS[index]}</Label>
              <div className="flex flex-1 items-center gap-2">
                <Input
                  type="time"
                  value={hour.openTime || ""}
                  onChange={(e) =>
                    handleHourChange(index, "openTime", e.target.value)
                  }
                  disabled={hour.isClosedAllDay}
                  className="w-28 border-white/30 bg-white/20 backdrop-blur-sm placeholder:text-gray-500 focus:border-blue-400/50 focus:bg-white/30 disabled:opacity-50"
                />
                <span className="text-gray-500">-</span>
                <Input
                  type="time"
                  value={hour.closeTime || ""}
                  onChange={(e) =>
                    handleHourChange(index, "closeTime", e.target.value)
                  }
                  disabled={hour.isClosedAllDay}
                  className="w-28 border-white/30 bg-white/20 backdrop-blur-sm placeholder:text-gray-500 focus:border-blue-400/50 focus:bg-white/30 disabled:opacity-50"
                />
              </div>
              <div className="flex flex-1 items-center gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded border-2 backdrop-blur-sm transition-all duration-200 ${
                      hour.hasBreakTime
                        ? "border-blue-600 bg-blue-500 shadow-lg shadow-blue-500/30"
                        : "border-gray-400 bg-white/40 hover:border-gray-500 hover:bg-white/60"
                    }`}
                    onClick={() =>
                      handleBreakTimeChange(index, !hour.hasBreakTime)
                    }
                  >
                    {hour.hasBreakTime && (
                      <div className="h-3 w-3 rounded-full bg-white shadow-sm"></div>
                    )}
                  </div>
                  <Label
                    htmlFor={`break-${index}`}
                    className="shrink-0 text-sm"
                  >
                    브레이크타임
                  </Label>
                </div>
                {hour.hasBreakTime && (
                  <>
                    <Input
                      id={`break-start-${index}`}
                      type="time"
                      value={hour.breakStartTime || ""}
                      onChange={(e) =>
                        handleHourChange(
                          index,
                          "breakStartTime",
                          e.target.value
                        )
                      }
                      disabled={hour.isClosedAllDay}
                      className="w-28 border-white/30 bg-white/20 backdrop-blur-sm placeholder:text-gray-500 focus:border-blue-400/50 focus:bg-white/30 disabled:opacity-50"
                    />
                    <span className="text-gray-500">-</span>
                    <Input
                      id={`break-end-${index}`}
                      type="time"
                      value={hour.breakEndTime || ""}
                      onChange={(e) =>
                        handleHourChange(index, "breakEndTime", e.target.value)
                      }
                      disabled={hour.isClosedAllDay}
                      className="w-28 border-white/30 bg-white/20 backdrop-blur-sm placeholder:text-gray-500 focus:border-blue-400/50 focus:bg-white/30 disabled:opacity-50"
                    />
                  </>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <div
                  className={`flex h-5 w-5 cursor-pointer items-center justify-center rounded border-2 backdrop-blur-sm transition-all duration-200 ${
                    hour.isClosedAllDay
                      ? "border-blue-600 bg-blue-500 shadow-lg shadow-blue-500/30"
                      : "border-gray-400 bg-white/40 hover:border-gray-500 hover:bg-white/60"
                  }`}
                  onClick={() =>
                    handleCheckboxChange(index, !hour.isClosedAllDay)
                  }
                >
                  {hour.isClosedAllDay && (
                    <div className="h-3 w-3 rounded-full bg-white shadow-sm"></div>
                  )}
                </div>
                <Label htmlFor={`closed-${index}`} className="shrink-0">
                  휴무일
                </Label>
              </div>
            </div>
            {index < WEEK_DAYS.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
