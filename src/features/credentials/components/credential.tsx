"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CredentialType } from "@/generated/prisma/enums";
import {
  useCreateCredential,
  useSuspenseCredential,
  useUpdateCredential,
} from "../hooks/use-credentials";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(CredentialType),
  value: z.string().min(1, "Value is required"),
});

type FormValues = z.infer<typeof formSchema>;

const credentialTypeOptions = [
  {
    value: CredentialType.DEEPSEEK,
    label: "Deepseek",
    logo: "/deepseek.svg",
  },
  {
    value: CredentialType.OPENAI,
    label: "OpenAI",
    logo: "/openai.svg",
  },
  {
    value: CredentialType.GEMINI,
    label: "Gemini",
    logo: "/gemini.svg",
  },
];

type CredentialFormProps = {
  initialData?: {
    id?: string;
    name: string;
    type: CredentialType;
    value: string;
  };
};

export const CredentialForm = ({ initialData }: CredentialFormProps) => {
  const router = useRouter();
  const createCredential = useCreateCredential();
  const updateCredential = useUpdateCredential();

  const isEdit = !!initialData?.id;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      type: CredentialType.DEEPSEEK,
      value: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    if (isEdit && initialData?.id) {
      await updateCredential.mutateAsync({
        id: initialData.id,
        ...values,
      });
    } else {
      await createCredential.mutateAsync(values, {
        onSuccess: (data) => {
          router.push(`/credentials/${data.id}`);
        },
      });
    }
  };

  return (
    <Card className="shadow-none">
      <CardHeader>
        <CardTitle>{isEdit ? "Edit Credential" : "New Credential"}</CardTitle>
        <CardDescription>
          {isEdit
            ? "Update your credential details below."
            : "Create a new credential by filling out the form below."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My API Key" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {credentialTypeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <Image
                              alt={option.label}
                              height={16}
                              src={option.logo}
                              width={16}
                            />
                            <span>{option.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input placeholder="sk-xxxxxx" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <Button
                disabled={
                  createCredential.isPending || updateCredential.isPending
                }
                type="submit"
              >
                {isEdit ? "Update Credential" : "Create Credential"}
              </Button>
              <Button asChild type="button" variant="outline">
                <Link href="/credentials" prefetch>
                  Cancel
                </Link>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export const CredentialView = ({ id }: { id: string }) => {
  const { data: credential } = useSuspenseCredential(id);
  return <CredentialForm initialData={credential} />;
};
