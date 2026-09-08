import { CircleUserRound } from 'lucide-react';
import dados from "../../../manutcontrol_dados.json";

export default function Header(){
    return(<>
        
        {/* HEADER */}
        <header className="bg-white text-black flex justify-between items-center px-6 border border-b-amarelo-claro">

            {/* LOGO */}
            <img src="/logo_ManutControl.png" alt="Logo" className="w-auto h-28 p-4" />

            {/* LINKS */}
            <ul className="flex text-amarelo-medio font-bold gap-15 items-center">
                <li className="cursor-pointer hover:text-amarelo-escuro">Visão Geral</li>
                <li className="cursor-pointer hover:text-amarelo-escuro">Ordens de Serviços</li>
                <li className="cursor-pointer hover:text-amarelo-escuro">Equipamentos</li>
                <li className="cursor-pointer hover:text-amarelo-escuro">Técnicos</li>
            </ul>

            {/* PERFIL + BOTÃO */}
            <div className="flex font-bold gap-10 mr-10">
                <a className="py-2 px-4 cursor-pointer flex items-center gap-2 hover:text-amarelo-escuro">
                    <CircleUserRound className="h-auto w-7"/>{dados.usuario}
                </a>
                <button type="button" className="bg-amarelo-claro py-2 px-4 border rounded-lg cursor-pointer">Sair</button>
            </div>

        </header>
        
    </>)
}