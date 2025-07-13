
import { AuroraText } from "@/components/magicui/aurora-text";
import { Facebook, Github, icons, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, YoutubeIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { clsx } from "clsx";

export default function Footer() {
    return (
        <footer className="relative bg-black text-white">
            {/* Parallax Animation Curtain */}
            <div className="absolute bottom-full left-0 h-[300px] w-full overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://i.ibb.co/nQM4PGJ/arbres.png')] bg-repeat-x bg-bottom animate-parallax" style={{ animationDuration: '2000s' }} />
                <div className="absolute inset-0 bg-[url('https://i.ibb.co/J3TjC4W/second-plan.png')] bg-repeat-x bg-bottom animate-parallax" style={{ animationDuration: '2000s' }} />
                <div className="absolute inset-0 bg-[url('https://i.ibb.co/RQhDWbk/premierplanv3.png')] bg-repeat-x bg-bottom animate-parallax" style={{ animationDuration: '700s' }} />
                <div className="absolute bottom-[80px] left-1/2 -ml-[250px] h-[200px] w-[150px] bg-[url('https://i.ibb.co/JCGfFJd/moto-net.gif')] bg-no-repeat animate-moto" />
                <div className="absolute bottom-[10px] left-1/2 ml-[250px] h-[114px] w-[206px] bg-[url('https://i.ibb.co/0Qhp4DN/voiture-fumee.gif')] bg-no-repeat animate-voiture" />
            </div>

            {/* Footer Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-16">
                <div className="bg-white/5 backdrop-blur-md rounded-xl p-10 md:grid md:grid-cols-3 gap-24">
                    {/* Logo + Info */}
                    <div>
                        <h3 className="uppercase text-3xl mb-6 font-extrabold font-rocksalt text-white">
                            <AuroraText className="font-bold">Code Hunter</AuroraText>
                        </h3>
                        <p className="text-lg font-changa py-4 text-muted-foreground">
                            Where logic meets ambition, and coders become champions — Crack
                            the toughest problems, climb the highest ranks, and launch your
                            journey with the CodeHunter community.
                        </p>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="uppercase text-2xl mb-4 ml-4 font-changa">Connect with us</h3>

                        <ul className="space-y-4  text-muted-foreground font-changa text-xl py-4 ml-1">
                            <li className="flex items-center gap-4 group text-xl hover:text-red-500 transition">
                                <YoutubeIcon className=" w-7 h-7 group-hover:scale-125 group-hover:drop-shadow-[0_0_2px_red]" />
                                <a href="" className="flex items-center custom-underline gap-4 group transition-all duration-200">Youtube</a>

                            </li>
                            <li className="flex items-center gap-4 group hover:text-blue-600 transition">
                                <Facebook className=" w-7 h-7 group-hover:scale-125 group-hover:drop-shadow-[3px_3px_2px_blue]" />
                                <a href="" className="flex items-center custom-underline gap-4 group transition-all duration-200">Facebook</a>

                            </li>
                            <li className="flex items-center gap-4 group hover:text-sky-500 transition">
                                <Linkedin className=" w-7 h-7 group-hover:scale-125 group-hover:drop-shadow-[2px_2px_2px_sky]" />
                                <a href="" className="flex items-center custom-underline gap-4 group transition-all duration-200">Linkedin</a>
                            </li>
                            <li className="flex items-center gap-4 group hover:text-blue-400 transition">
                                <Twitter className=" w-7 h-7 group-hover:scale-125 group-hover:drop-shadow-[2px_2px_2px_blue]" />
                                <a href="" className="flex items-center custom-underline gap-4 group transition-all duration-200">Twitter</a>
                            </li>
                            <li className="flex items-center gap-4 group hover:text-gray-400 transition">
                                <Github className=" w-7 h-7 group-hover:scale-125 group-hover:drop-shadow-[0_0_2px_gray]" />
                                <a href="" className="flex items-center custom-underline gap-4 group transition-all duration-200">Github</a>
                            </li>

                        </ul>


                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="uppercase text-2xl mb-4 font-changa ml-4">Contact</h3>
                        <ul className="space-y-4 text-base text-muted-foreground font-changa py-4 ml-1">
                            <li className="flex items-center gap-4 group hover:text-blue-500 transition">
                                <Mail className="group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_blue]" />
                                sadiv120@gmail.com
                            </li>
                            <li className="flex items-center gap-4 group hover:text-green-500 transition">
                                <Phone className="group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_green]" />
                                +91-8409973038
                            </li>
                            <li className="flex items-center gap-4 group hover:text-yellow-500 transition">
                                <MapPin className="group-hover:scale-125 group-hover:drop-shadow-[0_0_8px_yellow]" />
                                Pochanky Squard-House
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Divider */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white to-transparent my-5" />

                {/* Bottom Text + Scroll Button */}
                <div className="text-center text-sm text-white/80 font-changa  items-center gap-2">
                    © 2025 <span className="italic font-bold text-white text-xl">CodeHunter</span>. All rights reserved
                    <a href="https://twitter.com/adivdeco" target="_blank" className="underline  hover:text-blue-500">@adivdeco</a>

                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="ml-14 bg-white/10 text-white p-2 rounded-full hover:scale-110 transition backdrop-blur-sm"
                        title="Back to top"
                    >
                        <span
                            className={cn(
                                "absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[2px]"
                            )}
                            style={{
                                WebkitMask:
                                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                WebkitMaskComposite: "destination-out",
                                mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                maskComposite: "subtract",
                                WebkitClipPath: "padding-box",
                            }}
                        />
                        ⬆
                    </button>
                </div>
            </div>
        </footer >
    );
}
