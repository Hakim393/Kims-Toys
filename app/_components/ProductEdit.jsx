import React from "react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

function ProductEdit({ onEdit, onAnalyze, onDelete }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="p-2">
          <span className="material-icons">more_vert</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-32 p-2 space-y-2">
        <button
          className="w-full text-left hover:bg-gray-100 p-2 rounded-md text-gray-700"
          onClick={onEdit}
        >
          <span className="material-icons">edit</span>
          Edit
        </button>
        <button
          className="w-full text-left hover:bg-gray-100 p-2 rounded-md text-gray-700"
          onClick={onAnalyze}
        >
          <span className="material-icons">insights</span>
          Analytic
        </button>
        <button
          className="w-full text-left hover:bg-red-100 p-2 rounded-md text-red-700"
          onClick={onDelete}
        >
          <span className="material-icons">delete</span>
          Hapus
        </button>
      </PopoverContent>
    </Popover>
  );
}

export default ProductEdit;
