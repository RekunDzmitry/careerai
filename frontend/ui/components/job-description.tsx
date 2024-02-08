import React from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const JobDescription = (props) => {
  const Title = props.Title;
  const Description = props.Description;
  const Responsibilities = props.Responsibilities;
  const Skills = props.Skills;

  return (
    <Sheet>
      <SheetTrigger className="w-full md:w-1/2 lg:w-1/3 p-4 border border-black">{Title}</SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{Title}</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          <div className="mb-4">
            <Label>Description</Label>
            <p className="text-gray-700">{Description}</p>
          </div>
          <div className="mb-4">
            <Label>Responsibilities</Label>
            <p className="text-gray-700">{Responsibilities.map((responsibility, index) => (
                <li key={index}>{responsibility}</li>
              ))}</p>
          </div>
          <div className="mb-4">
            <Label>Required Skills</Label>
            <ul className="list-disc list-inside">
              {Skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
        </SheetDescription>
        <SheetFooter>
          <Button variant="secondary">Mock interview</Button>
          <Button variant="primary">Start learning</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export {
  JobDescription
};
