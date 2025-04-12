"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export function ApplicationsFilter() {
  const [searchTerm, setSearchTerm] = useState("");
  const [productType, setProductType] = useState("all");
  const [status, setStatus] = useState("all");

  const handleFilterChange = () => {
    const filterData = { searchTerm, productType, status };
    sendDataToAPI(filterData);
  };

 

  const sendDataToAPI = async (filterData: { searchTerm: string; productType: string; status: string; }) => {

    console.log(filterData)
    // try {
    //   const response = await fetch("https://your-api-endpoint.com/filter", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(filterData),
    //   });
    //   if (!response.ok) {
    //     throw new Error("Failed to send data");
    //   }
    //   console.log("Data sent successfully", await response.json());
    // } catch (error) {
    //   console.error("Error sending data:", error);
    // }
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="flex w-full items-center space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search applications..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button type="submit" onClick={handleFilterChange}>Search</Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <Select value={productType} onValueChange={(value) => { setProductType(value); handleFilterChange(); }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Product Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            <SelectItem value="loan">Loans</SelectItem>
            <SelectItem value="credit-card">Credit Cards</SelectItem>
            <SelectItem value="insurance">Insurance</SelectItem>
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={(value) => { setStatus(value); handleFilterChange(); }}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
