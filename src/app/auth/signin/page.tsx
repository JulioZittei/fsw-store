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
import { SocialIcons } from "@/components/ui/social-icons";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import * as z from "zod";
import { useToast } from "@/components/ui/use-toast";
import { FormEvent, useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "E-mail é obrigatório",
    })
    .email({
      message: "E-mail inválido",
    }),
  password: z.string().min(1, {
    message: "Senha é obrigatória",
  }),
});

const SigninPage = ({
  searchParams: { callbackUrl },
}: {
  searchParams: {
    callbackUrl: string;
  };
}) => {
  const { replace } = useRouter();
  const { data: session } = useSession();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLoginWithGoogleClick = async (
    e: FormEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    const res = await signIn("google", { redirect: false });

    if (res?.error) {
      toast({
        variant: "destructive",
        title: "Ops! Deu ruim",
        description: res?.error,
      });
    } else {
      replace(callbackUrl ?? "/");
    }
  };

  const handleToggleShowPassword = (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  if (session) {
    replace(callbackUrl ?? "/");
  }

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const res = await signIn<"credentials">("credentials", {
      ...data,
      redirect: false,
    });

    if (res?.error) {
      toast({
        variant: "destructive",
        title: "Ops! Deu ruim",
        description: res?.error,
      });
    } else {
      replace(callbackUrl ?? "/");
    }
  };

  return (
    <div className="w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="mx-auto w-full max-w-[600px]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-center text-2xl">
                Acessar minha conta
              </CardTitle>
              <CardDescription className="text-center">
                Ainda não tem uma conta?{" "}
                <Link
                  href={`/auth/signup?callbackUrl=${encodeURIComponent(
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
                name="email"
                render={({ field }) => (
                  <FormItem>
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
                  <FormItem>
                    <FormLabel htmlFor="password">Senha</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Sua senha"
                          {...field}
                          className={cn(
                            form.formState.errors[field.name] &&
                              "border border-solid border-destructive",
                            "pr-12",
                          )}
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
                    <FormMessage />
                    <FormDescription>
                      <Button
                        variant="link"
                        className="h-auto p-0 text-xs leading-none text-muted-foreground underline"
                        asChild
                      >
                        <Link href="/auth/forgot-password">
                          Esqueceu sua senha?
                        </Link>
                      </Button>
                    </FormDescription>
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
                <Button variant="outline" onClick={handleLoginWithGoogleClick}>
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

                {form.formState.isSubmitting ? "Entrando" : "Entrar"}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default SigninPage;
