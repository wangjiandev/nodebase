"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTRPC } from "@/trpc/client";

const Client = () => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const { data } = useQuery(trpc.getWorkflows.queryOptions());
  const create = useMutation(
    trpc.createWorkflow.mutationOptions({
      onSuccess: ({ message }) => {
        queryClient.invalidateQueries(trpc.getWorkflows.queryOptions());
        toast.success(message);
      },
    })
  );
  const textAi = useMutation(
    trpc.textAi.mutationOptions({
      onSuccess: ({ text }) => {
        toast.success(text);
      },
    })
  );
  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>This is a description of the card.</CardDescription>
      </CardHeader>
      <CardContent>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </CardContent>
      <CardFooter>
        <Button disabled={create.isPending} onClick={() => create.mutate()}>
          Create Workflow
        </Button>
        <Button disabled={textAi.isPending} onClick={() => textAi.mutate()}>
          textAi
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Client;
