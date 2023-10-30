"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { SocialIcons } from "@/components/ui/social-icons";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const formSchema = z
  .object({
    name: z
      .string()
      .min(3, {
        message: "Nome é obrigatório",
      })
      .refine(
        (value) => /^[A-Z][a-z]+\s[A-Z][a-z]+(?:\s[A-Z][a-z]+)*$/.test(value),
        {
          message: "Nome deve conter ao menos um sobrenome",
        },
      ),
    email: z
      .string()
      .min(1, {
        message: "E-mail é obrigatório",
      })
      .email({
        message: "E-mail inválido",
      }),
    password: z
      .string()
      .min(8, {
        message: "Mínimo de 8 caracteres",
      })
      .max(24, {
        message: "Máximo de 24 caracteres",
      })
      .refine((value) => /[A-Z]/.test(value), {
        message: "A senha deve conter pelo menos uma letra maiúscula",
      })
      .refine((value) => /\d/.test(value), {
        message: "A senha deve conter pelo menos um número",
      })
      .refine((value) => /[!@#$%^&*]/.test(value), {
        message:
          "A senha deve conter pelo menos um caractere especial (!@#$%^&*)",
      }),
    passwordMatch: z
      .string()
      .min(8, {
        message: "Mínimo de 8 caracteres",
      })
      .max(24, {
        message: "Máximo de 24 caracteres",
      }),
  })
  .refine(({ password, passwordMatch }) => password === passwordMatch, {
    message: "Senhas não correspodem",
    path: ["passwordMatch"],
  });

const SignUpPage = ({
  searchParams: { callbackUrl },
}: {
  searchParams: {
    callbackUrl: string;
  };
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const { replace } = useRouter();

  const handleSignUpWithGoogleClick = async (
    e: FormEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    signIn("google", { redirect: false });
    replace(callbackUrl ?? "/");
  };

  const handleToggleShowPassword = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const req = await fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await req.json();

    if (!req.ok) {
      toast({
        variant: "destructive",
        title: "Ops! Deu ruim",
        description: res.error.message,
      });
    } else {
      replace("/auth/signin");
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordMatch: "",
    },
  });

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="mx-auto w-full max-w-[600px]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-center text-2xl">
                Criar uma conta
              </CardTitle>
              <CardDescription className="text-center">
                Já tem uma conta?{" "}
                <Link
                  href={`/auth/signin?callbackUrl=${encodeURIComponent(
                    callbackUrl,
                  )}`}
                  className="underline"
                >
                  Clique aqui
                </Link>
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Seu nome"
                        {...field}
                        className={cn(
                          form.formState.errors[field.name] &&
                            "border border-solid border-destructive",
                        )}
                      />
                    </FormControl>
                    {/* <FormDescription /> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Seu e-mail"
                        {...field}
                        className={cn(
                          form.formState.errors[field.name] &&
                            "border border-solid border-destructive",
                        )}
                      />
                    </FormControl>
                    {/* <FormDescription /> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel htmlFor="password">Crie uma senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          className={cn(
                            form.formState.errors[field.name] &&
                              "border border-solid border-destructive",
                            "pr-12",
                          )}
                          type={showPassword ? "text" : "password"}
                          placeholder="Sua senha"
                          {...field}
                        />
                        <button
                          tabIndex={-1}
                          className="absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground"
                          onClick={handleToggleShowPassword}
                        >
                          {showPassword ? <Eye /> : <EyeOff />}
                        </button>
                      </div>
                    </FormControl>
                    {/* <FormDescription /> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passwordMatch"
                render={({ field }) => (
                  <FormItem className="mb-3">
                    <FormLabel htmlFor="passwordMatch">
                      Confirme sua senha
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="passwordMatch"
                          className={cn(
                            form.formState.errors[field.name] &&
                              "border border-solid border-destructive",
                            "pr-12",
                          )}
                          type={showPassword ? "text" : "password"}
                          placeholder="Confirme sua senha"
                          {...field}
                        />
                        <button
                          tabIndex={-1}
                          className="absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground"
                          onClick={handleToggleShowPassword}
                        >
                          {showPassword ? <Eye /> : <EyeOff />}
                        </button>
                      </div>
                    </FormControl>
                    {/* <FormDescription /> */}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Ou continue com
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                <Button variant="outline" onClick={handleSignUpWithGoogleClick}>
                  <SocialIcons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}

                {form.formState.isSubmitting ? "Criando conta" : "Criar conta"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default SignUpPage;
