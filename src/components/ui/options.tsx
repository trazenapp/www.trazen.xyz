"use client";

import React from "react";
import Card from "../card";
import { Button } from "./button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";

interface OptionsProps {
  className?: string;
}

function Options({ className }: OptionsProps) {
  return (
    <Card className={`${className} py-1!`}>
      <Dialog>
          <DialogTrigger asChild>
            <Button className="hover:cursor-pointer hover:text-white duration-100 bg-transparent!">
              Delete Project
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] bg-[#161616] border-0! font-sans">
            <DialogHeader>
              <DialogTitle>Delete Project</DialogTitle>
              <DialogDescription>
                Are you shre you want to delete this project? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
      </Dialog>
    </Card>
  );
}

export default Options;
