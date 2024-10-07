'use client'

import { NavList } from "@/components/public/style/style-global";
import { Navbar, NavbarBrand, NavbarContent, NavbarMenuToggle } from "@nextui-org/navbar";
import Link from "next/link";
import Switcher from "@/components/dark-mode/ThemeSwitcher";
import { signIn, useSession, signOut } from "next-auth/react";
import { Button } from "@nextui-org/react";
import SelectLanguage from "@/components/buttonChangeI/selectLanguage";
import { useTranslations } from "next-intl";



export default function NavegacionGeneral() {
    const translate = useTranslations("NavegacionGeneral")

    const { data: session } = useSession()
    console.log(session);

    return (

        <Navbar
            shouldHideOnScroll
            isBordered
            variant="floating"
            className="shadow-lg backdrop-blur-md bg-white/70 dark:bg-gray-900/70"
        >
            {/* Marca centrada */}
            <NavbarBrand className="mx-auto text-3xl font-semibold tracking-wide">
                <Link href="/" className="text-primary hover:text-accent transition-colors"> {translate("usertitle")}
                </Link>
            </NavbarBrand>

            {/* Contenido de la derecha */}
            <NavbarContent justify="end" className="flex items-center gap-4">
                {session?.user ? (
                    <div className="flex items-center gap-4">
                        <p className="text-sm font-medium">Bienvenido {session.user.name}</p>
                        <img
                            src={session.user.image}
                            alt="User Avatar"
                            className="w-10 h-10 rounded-full object-cover border border-primary"
                        />
                        <Button
                            className="text-sm font-medium bg-red-500 hover:bg-red-600 transition-all"
                            onClick={async () => {
                                await signOut({ callbackUrl: '/' });
                            }}
                        >{translate("BotonSession")}

                        </Button>
                    </div>
                ) : (
                    <Button
                        className="text-sm font-medium bg-blue-500 hover:bg-blue-600 transition-all"
                        onClick={() => signIn()}
                    >
                        SignIn
                    </Button>
                )}
                <SelectLanguage />
            </NavbarContent>

            {/* Contenedor del Switcher a la derecha */}
            <div className="flex items-center gap-4 ml-4">
                <Switcher />
            </div>

            <NavbarMenuToggle aria-label="Toggle Menu" className="md:hidden" />
        </Navbar>
    );
}