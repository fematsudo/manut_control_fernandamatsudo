"use client";

import dados from "../../manutcontrol_dados.json";
import { useState } from "react";
import { NotepadText, ClockAlert, CirclePause, CalendarDays, Clock, MapPin, UserRound, ChevronRight } from "lucide-react";
import Header from "./components/Header";

export default function Home() {

  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroPrioridade, setFiltroPrioridade] = useState("");

  const ordensFiltradas = dados.ordensServico.filter((ordem) => {

    const equipamento = dados.equipamentos.find((equipamento) =>equipamento.id === ordem.equipamentoId);

    const textoBusca = busca.toLowerCase();

    const correspondeBusca =
      String(ordem.codigo ?? "")
        .toLowerCase()
        .includes(textoBusca) ||

      String(ordem.descricao ?? "")
        .toLowerCase()
        .includes(textoBusca) ||

      String(equipamento?.codigo ?? "")
        .toLowerCase()
        .includes(textoBusca) ||

      String(equipamento?.nome ?? "")
        .toLowerCase()
        .includes(textoBusca) ||

      String(ordem.tecnico ?? "")
        .toLowerCase()
        .includes(textoBusca);

    const correspondeStatus = filtroStatus === "" || ordem.status === filtroStatus;
    const correspondePrioridade = filtroPrioridade === "" || ordem.prioridade === filtroPrioridade;

    return ( correspondeBusca && correspondeStatus && correspondePrioridade);

  });

  const agendaHoje = dados.ordensServico.filter((ordem) => ordem.horarioAgendado).sort((a, b) => a.horarioAgendado.localeCompare(b.horarioAgendado));

  const equipamentosCriticos = dados.equipamentos.filter((equipamento) =>equipamento.criticidade === "alta");

  const encontrarEquipamento = (id) => {
    return dados.equipamentos.find((equipamento) => equipamento.id === id);
  };

  const formatarStatus = (status) => {

    const statusMap = {
      vencida: "Vencida",
      "em andamento": "Em andamento",
      aberta: "Aberta",
      planejada: "Planejada",
      concluida: "Concluída",
    };

    return statusMap[status] || status;

  };

  const statusAgendaClasses = (status) => {
    if (status === "vencida") {return "bg-red-100 text-red-700 border-red-200";}
    if (status === "em andamento") {return "bg-blue-100 text-blue-700 border-blue-200";}
    if (status === "aberta") {return "bg-yellow-100 text-yellow-700 border-yellow-200";}
    if (status === "planejada") {return "bg-gray-100 text-gray-700 border-gray-200";}
    if (status === "concluida") {return "bg-green-100 text-green-700 border-green-200";}
    return "bg-gray-100 text-gray-700 border-gray-200";
  };

  const statusEquipamentoClasses = (status) => {
    if (status === "parado") {return "bg-red-100 border-red-200 text-red-700";}
    if (status === "em manutencao") {return "bg-blue-100 border-blue-200 text-blue-700";}
    if (status === "atencao") {return "bg-yellow-100 border-yellow-200 text-yellow-700";}
    if (status === "operando") {return "bg-green-100 border-green-200 text-green-700";}
    return "bg-gray-100 border-gray-200 text-gray-700";
  };

  const formatarStatusEquipamento = (status) => {
    const statusMap = {
      parado: "Parado",
      "em manutencao": "Em manutenção",
      atencao: "Atenção",
      operando: "Operando",
    };

    return statusMap[status] || status;
  };

  const prioridadeClasses = (prioridade) => {
    if (prioridade === "urgente") {return "bg-red-100 text-red-700";}
    if (prioridade === "alta") {return "bg-orange-100 text-orange-700";}
    if (prioridade === "media") {return "bg-yellow-100 text-yellow-700";}
    if (prioridade === "baixa") {return "bg-green-100 text-green-700";}
    return "bg-gray-100 text-gray-700";
  };

  return (

    <>

      <Header />

      <div className="bg-white text-black px-6 md:px-10 xl:px-12 py-8 w-full min-h-screen">

        <div className="flex flex-col gap-2 pb-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

            <div>
              <h1 className="text-amarelo-medio text-3xl md:text-4xl">Bom dia,{" "}<strong>{dados.usuario}</strong>!</h1>
              <p className="mt-2 text-gray-600">Veja o que precisa de atenção hoje!</p>
            </div>

            <button type="button" className="bg-amarelo-claro font-bold px-5 py-3 border border-amarelo-medio rounded-xl cursor-pointer hover:opacity-80 transition w-fit">
              + Nova Ordem
            </button>

          </div>

        </div>


        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

          <div className="border rounded-2xl border-cinza p-6 flex-1 hover:shadow-md transition bg-white">

            <p className="text-lg flex items-center gap-3">
              <NotepadText className="bg-blue-300 w-14 h-14 p-3 rounded-2xl border border-blue-900 text-blue-900"/>
              <span className="text-2xl text-blue-900 font-semibold">{dados.ordensServico.filter((ordem) => ordem.status === "aberta").length}</span>
              <span>Ordens abertas</span>
            </p>

          </div>

          <div className="border rounded-2xl border-cinza p-6 flex-1 hover:shadow-md transition bg-white">

            <p className="text-lg flex items-center gap-3">
              <ClockAlert className="bg-red-300 w-14 h-14 p-3 rounded-2xl border border-red-900 text-red-900"/>
              <span className="text-2xl text-red-900 font-semibold">{dados.ordensServico.filter((ordem) => ordem.status === "vencida").length}</span>
              <span>Vencidas</span>
            </p>

          </div>

          <div className="border rounded-2xl border-cinza p-6 flex-1 hover:shadow-md transition bg-white">

            <p className="text-lg flex items-center gap-3">
              <CirclePause className="bg-yellow-200 w-14 h-14 p-3 rounded-2xl border border-yellow-600 text-yellow-600"/>
              <span className="text-2xl text-yellow-600 font-semibold">{dados.equipamentos.filter((equipamento) => equipamento.status === "parado").length}</span>
              <span>Equipamentos parados</span>
            </p>

          </div>

          <div className="border rounded-2xl border-cinza p-6 flex-1 hover:shadow-md transition bg-white">

            <p className="text-lg flex items-center gap-3">
              <CirclePause className="bg-green-200 w-14 h-14 p-3 rounded-2xl border border-green-600 text-green-600"/>
              <span className="text-2xl text-green-600 font-semibold">{dados.ordensServico.filter((ordem) => ordem.status === "concluida").length}</span>
              <span>Concluídas</span>
            </p>

          </div>

        </div>


        <div className=" border border-cinza rounded-2xl mt-10 p-6 md:p-8 bg-white shadow-sm">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            <div>
              <h2 className="font-bold text-2xl tracking-wide">Ordens que exigem atenção</h2>
              <p className="text-sm text-gray-500 mt-1">Consulte e filtre as ordens de serviço.</p>
            </div>

            <span className="bg-gray-100 border border-gray-200 px-4 py-2 rounded-full text-sm font-semibold text-gray-700 w-fit">{ordensFiltradas.length}{" "}{ordensFiltradas.length === 1 ? "ordem" : "ordens"}</span>

          </div>


          {/* FILTROS */}

          <div className="flex gap-3 flex-wrap">

            <input
              type="text"
              placeholder="Buscar ordem, equipamento ou técnico"
              value={busca}
              onChange={(e) =>
                setBusca(e.target.value)
              }
              className="
                border
                border-amarelo-claro
                p-3
                w-full
                md:w-90
                rounded-lg
                outline-none
                focus:border-amarelo-medio
                transition
              "
            />


            <select
              value={filtroStatus}
              onChange={(e) =>
                setFiltroStatus(e.target.value)
              }
              className="
                p-3
                border
                border-amarelo-claro
                rounded-lg
                outline-none
                cursor-pointer
                bg-white
              "
            >

              <option value="">
                Todos os status
              </option>

              <option value="vencida">
                Vencida
              </option>

              <option value="em andamento">
                Em andamento
              </option>

              <option value="aberta">
                Aberta
              </option>

              <option value="planejada">
                Planejada
              </option>

              <option value="concluida">
                Concluída
              </option>

            </select>


            <select
              value={filtroPrioridade}
              onChange={(e) =>
                setFiltroPrioridade(e.target.value)
              }
              className="
                p-3
                border
                border-amarelo-claro
                rounded-lg
                outline-none
                cursor-pointer
                bg-white
              "
            >

              <option value="">
                Todas as prioridades
              </option>

              <option value="urgente">
                Urgente
              </option>

              <option value="alta">
                Alta
              </option>

              <option value="media">
                Média
              </option>

              <option value="baixa">
                Baixa
              </option>

            </select>

          </div>



          <div className="mt-8 overflow-x-auto">

            <table className="w-full border-collapse min-w-[950px]">

              <thead>

                <tr className="bg-gray-100 border">

                  <th className="p-3 border">

                    <input
                      type="checkbox"
                      disabled
                      className="
                        w-5
                        h-5
                        appearance-none
                        border
                        border-gray-500
                        rounded
                      "
                    />

                  </th>

                  <th className="p-3 border text-left">
                    OS
                  </th>

                  <th className="p-3 border text-left">
                    Descrição
                  </th>

                  <th className="p-3 border text-left">
                    Equipamento
                  </th>

                  <th className="p-3 border text-left">
                    Prioridade
                  </th>

                  <th className="p-3 border text-left">
                    Técnico
                  </th>

                  <th className="p-3 border text-left">
                    Vencimento
                  </th>

                  <th className="p-3 border text-left">
                    Status
                  </th>

                </tr>

              </thead>


              <tbody>

                {ordensFiltradas.length === 0 ? (

                  <tr>

                    <td
                      colSpan="8"
                      className="
                        text-center
                        p-10
                        text-gray-500
                      "
                    >

                      Nenhuma ordem encontrada.

                    </td>

                  </tr>

                ) : (

                  ordensFiltradas.map((ordem) => {

                    const equipamento =
                      dados.equipamentos.find(
                        (equipamento) =>
                          equipamento.id ===
                          ordem.equipamentoId
                      );


                    return (

                      <tr
                        key={ordem.id}
                        className="
                          border
                          hover:bg-gray-50
                          transition
                        "
                      >

                        <td className="border p-3 text-center">

                          <input
                            type="checkbox"
                            className="w-5 h-5"
                          />

                        </td>


                        <td className="border p-3">

                          <strong>
                            {ordem.codigo}
                          </strong>

                        </td>


                        <td className="border p-3">

                          {ordem.descricao}

                        </td>


                        <td className="border p-3">

                          <div>

                            <strong>
                              {equipamento?.codigo}
                            </strong>

                            <p className="text-sm text-gray-500">
                              {equipamento?.nome}
                            </p>

                          </div>

                        </td>


                        <td className="border p-3">

                          <span
                            className={`
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-bold
                              capitalize
                              ${prioridadeClasses(
                                ordem.prioridade
                              )}
                            `}
                          >

                            {ordem.prioridade}

                          </span>

                        </td>


                        <td className="border p-3">

                          {ordem.tecnico}

                        </td>


                        <td className="border p-3">

                          {ordem.vencimento}

                        </td>


                        <td className="border p-3">

                          <span
                            className={`
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-bold
                              ${statusAgendaClasses(
                                ordem.status
                              )}
                            `}
                          >

                            {formatarStatus(
                              ordem.status
                            )}

                          </span>

                        </td>

                      </tr>

                    );

                  })

                )}

              </tbody>

            </table>

          </div>

        </div>

        <div
          className="
            border
            border-cinza
            rounded-2xl
            mt-10
            p-6
            md:p-8
            bg-white
            shadow-sm
          "
        >

          {/* CABEÇALHO */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            <div className="flex items-center gap-3">

              <div
                className="
                  bg-amarelo-claro
                  border
                  border-amarelo-medio
                  rounded-xl
                  p-3
                "
              >

                <CalendarDays
                  className="w-6 h-6 text-amarelo-medio"
                />

              </div>


              <div>

                <h2 className="font-bold text-2xl tracking-wide">
                  Agenda de hoje
                </h2>

                <p className="text-sm text-gray-500">
                  Ordens e atividades programadas
                </p>

              </div>

            </div>


            <span
              className="
                bg-gray-100
                border
                border-gray-200
                px-4
                py-2
                rounded-full
                text-sm
                font-semibold
                text-gray-700
                w-fit
              "
            >

              {agendaHoje.length}{" "}

              {
                agendaHoje.length === 1
                  ? "compromisso"
                  : "compromissos"
              }

            </span>

          </div>



          {/* AGENDA */}

          {agendaHoje.length === 0 ? (

            <div
              className="
                border
                border-dashed
                border-gray-300
                rounded-xl
                p-10
                text-center
                text-gray-500
              "
            >

              <CalendarDays
                className="w-10 h-10 mx-auto mb-3 opacity-50"
              />

              <p className="font-semibold">
                Nenhum compromisso agendado para hoje.
              </p>

              <p className="text-sm mt-1">
                A agenda está livre.
              </p>

            </div>

          ) : (

            <div className="flex flex-col">

              {agendaHoje.map((ordem, index) => {

                const equipamento =
                  encontrarEquipamento(
                    ordem.equipamentoId
                  );


                return (

                  <div
                    key={ordem.id}
                    className={`
                      flex
                      flex-col
                      lg:flex-row
                      lg:items-center
                      gap-5
                      py-5
                      px-3
                      hover:bg-gray-50
                      transition
                      rounded-lg
                      ${
                        index !== agendaHoje.length - 1
                          ? "border-b border-gray-200"
                          : ""
                      }
                    `}
                  >


                    {/* HORÁRIO */}

                    <div
                      className="
                        min-w-24
                        flex
                        flex-col
                        items-center
                        justify-center
                      "
                    >

                      <Clock
                        className="
                          w-5
                          h-5
                          text-amarelo-medio
                          mb-1
                        "
                      />

                      <span className="font-bold text-xl">
                        {ordem.horarioAgendado}
                      </span>

                    </div>


                    {/* LINHA */}

                    <div
                      className="
                        hidden
                        lg:block
                        w-px
                        h-16
                        bg-gray-200
                      "
                    />


                    {/* INFORMAÇÕES */}

                    <div className="flex-1 min-w-0">

                      <div className="flex items-center gap-3 mb-1 flex-wrap">

                        <span className="font-bold text-base">
                          {ordem.codigo}
                        </span>


                        <span
                          className={`
                            px-2.5
                            py-1
                            rounded-full
                            border
                            text-xs
                            font-semibold
                            ${statusAgendaClasses(
                              ordem.status
                            )}
                          `}
                        >

                          {formatarStatus(
                            ordem.status
                          )}

                        </span>

                      </div>


                      <p className="font-medium text-gray-800">
                        {ordem.descricao}
                      </p>


                      <div
                        className="
                          flex
                          flex-wrap
                          items-center
                          gap-x-5
                          gap-y-2
                          mt-2
                          text-sm
                          text-gray-500
                        "
                      >

                        <span className="flex items-center gap-1.5">

                          <MapPin className="w-4 h-4" />

                          {equipamento?.setor}

                        </span>


                        <span className="flex items-center gap-1.5">

                          <UserRound className="w-4 h-4" />

                          {ordem.tecnico}

                        </span>


                        <span className="text-gray-400">

                          {equipamento?.codigo}

                        </span>

                      </div>

                    </div>


                    {/* PRIORIDADE */}

                    <div className="hidden md:flex flex-col items-end gap-1">

                      <span className="text-xs text-gray-400 uppercase tracking-wide">
                        Prioridade
                      </span>


                      <span
                        className={`
                          px-3
                          py-1
                          rounded-full
                          text-xs
                          font-bold
                          capitalize
                          ${prioridadeClasses(
                            ordem.prioridade
                          )}
                        `}
                      >

                        {ordem.prioridade}

                      </span>

                    </div>


                    {/* SETA */}

                    <button
                      type="button"
                      className="
                        p-2
                        rounded-lg
                        hover:bg-gray-100
                        transition
                        cursor-pointer
                      "
                    >

                      <ChevronRight
                        className="w-5 h-5 text-gray-400"
                      />

                    </button>

                  </div>

                );

              })}

            </div>

          )}

        </div>

        <div
          className="
            border
            border-red-200
            rounded-2xl
            mt-10
            p-6
            md:p-8
            bg-red-50
            shadow-sm
          "
        >

          {/* CABEÇALHO */}

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">

            <div>

              <h2 className="font-bold text-2xl text-red-900">

                Equipamentos críticos

              </h2>


              <p className="text-sm text-red-700 mt-1">

                Equipamentos de alta criticidade que exigem acompanhamento

              </p>

            </div>


            <span
              className="
                bg-red-100
                border
                border-red-200
                px-4
                py-2
                rounded-full
                text-sm
                font-bold
                text-red-700
                w-fit
              "
            >

              {equipamentosCriticos.length}{" "}

              {
                equipamentosCriticos.length === 1
                  ? "equipamento"
                  : "equipamentos"
              }

            </span>

          </div>



          {/* LISTA */}

          {equipamentosCriticos.length === 0 ? (

            <div
              className="
                border
                border-dashed
                border-red-200
                rounded-xl
                p-8
                text-center
                text-red-600
                bg-white
              "
            >

              <p className="font-semibold">

                Nenhum equipamento de alta criticidade.

              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">

              {equipamentosCriticos.map(
                (equipamento) => (

                  <div
                    key={equipamento.id}
                    className="
                      bg-white
                      border
                      border-red-200
                      rounded-xl
                      p-5
                      flex
                      items-center
                      gap-4
                      hover:shadow-md
                      transition
                    "
                  >


                    {/* ÍCONE */}

                    <div
                      className={`
                        w-12
                        h-12
                        rounded-xl
                        flex
                        items-center
                        justify-center
                        border
                        font-bold
                        text-xl
                        ${
                          equipamento.status === "parado"
                            ? "bg-red-100 border-red-200 text-red-700"
                            : equipamento.status === "em manutencao"
                              ? "bg-blue-100 border-blue-200 text-blue-700"
                              : equipamento.status === "atencao"
                                ? "bg-yellow-100 border-yellow-200 text-yellow-700"
                                : "bg-green-100 border-green-200 text-green-700"
                        }
                      `}
                    >

                      !

                    </div>


                    {/* INFORMAÇÕES */}

                    <div className="flex-1 min-w-0">

                      <div className="flex items-center gap-3 flex-wrap">

                        <strong className="text-lg text-gray-900">

                          {equipamento.codigo}

                        </strong>


                        {/* STATUS REAL */}

                        <span
                          className={`
                            px-2.5
                            py-1
                            rounded-full
                            border
                            text-xs
                            font-bold
                            ${statusEquipamentoClasses(
                              equipamento.status
                            )}
                          `}
                        >

                          {formatarStatusEquipamento(
                            equipamento.status
                          )}

                        </span>

                      </div>


                      <p className="text-gray-700 font-medium mt-1">

                        {equipamento.nome}

                      </p>


                      <div
                        className="
                          flex
                          flex-wrap
                          gap-x-5
                          gap-y-2
                          mt-3
                          text-sm
                          text-gray-500
                        "
                      >

                        <span>

                          Setor:{" "}

                          <strong className="text-gray-700">

                            {equipamento.setor}

                          </strong>

                        </span>


                        <span>

                          Criticidade:{" "}

                          <strong className="text-red-600 capitalize">

                            {equipamento.criticidade}

                          </strong>

                        </span>


                        <span>

                          Última manutenção:{" "}

                          <strong className="text-gray-700">

                            {equipamento.ultimaManutencao}

                          </strong>

                        </span>

                      </div>

                    </div>


                    {/* SETA */}

                    <button
                      type="button"
                      className="
                        p-2
                        rounded-lg
                        hover:bg-red-100
                        transition
                        cursor-pointer
                      "
                    >

                      <ChevronRight
                        className="w-5 h-5 text-red-400"
                      />

                    </button>

                  </div>

                )
              )}

            </div>

          )}

        </div>


      </div>

    </>

  );

}