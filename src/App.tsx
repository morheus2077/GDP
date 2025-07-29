import { useState } from 'react'
import './App.css'
import { CircleDollarSign, Calculator, ChartNoAxesColumn, CirclePlus, ListCheck, Pencil, Trash, CalendarCheck2, Instagram, Facebook, Send, Github, Phone, Mail} from 'lucide-react'
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { v4 as uuidv4 } from 'uuid';

function App() {

  interface Despesas{
    readonly id: string;
    nome: string;
    valor: number;
    data: string;
    categoria: string;
    //descricao: string
  }

  const[nome, setNome] = useState <string>("");
  const[valor, setValor] = useState <number>(0);
  const[data, setdata] = useState <string>("");
  const[categoria, setCategoria] = useState<string>("");
  //const[descricao, setDescricao] = useState <string>("");
  const[numeroDespesas, setNumeroDespesas] = useState <number>(0)
  const[totalDespesa, setTotalDespesa] = useState <number>(0);
  const[mediaDespesa, setMediaDespesa] = useState <number>(0);

  const[inputfiltroCategoria, setinputFiltroCategoria] = useState("");

  const[textoAtualizar, setTextoAtualizar] = useState({
    enabled: false,
    despe: null as Despesas | null
  })

  const[Despesa, setDespesa] = useState <Despesas[]>([])


  // funcao para adicionar despesas
  function adicionarDespesa(){
    
    //formatando a data
    const dataFormatada = data;
    format(data, 'dd/MM/yyyy', {locale: ptBR});

    const novaDespesa: Despesas = {
      id: uuidv4(), 
      nome,
      valor,
      data: dataFormatada,
      categoria,
      //descricao
    }

      setDespesa((prev) => {
      const novoArray = [...prev, novaDespesa];
      let total = Despesa.reduce((acumulador, Despesa) => acumulador + Despesa.valor, valor);
      setTotalDespesa(total); 

      if(total> 0 && novoArray.length > 1){
      let media = total/novoArray.length;
      setMediaDespesa(media)
      }
      setNumeroDespesas(novoArray.length)
      return novoArray;
  })

    if(Despesa.length > 0){
      setNumeroDespesas(Despesa.length)
    }
    
 
    //limpando os campos(inputs)
    setNome("");
    setValor(0)
    setCategoria("");
    //setDescricao("");
    setdata("");

  }

  //funcao para remover a despesa
  async function removerDespesa(id: string){
    const removeDespesa = Despesa.filter(despesas => despesas.id !== id)
    setDespesa(removeDespesa);

      let total = removeDespesa.reduce((acumulador, Despesa) => acumulador + Despesa.valor, valor);
      setTotalDespesa(total);
      
      let media = total/removeDespesa.length;
      setMediaDespesa(media)
      setNumeroDespesas(removeDespesa.length)

      if(total === 0 && removeDespesa.length === 0){
        setMediaDespesa(0);
      }

      if(removeDespesa.length === 1){
        setMediaDespesa(0);
      }

  }

  //funcao para colocar os valores da despesa que queremos atualizar nos inputs
  function valoresAtualizar(item: any, nome: string, valor: number, data: string, categoria: string){
    setNome(nome);
    setValor(valor);
    setdata(data);
    setCategoria(categoria);

    setTextoAtualizar({
      enabled: true,
      despe:  item
    })


  }

  //funcao para atualizar despesas
  function atualizarDespesa(){
    const indiceDespesa = Despesa.findIndex((desp) => desp.id === textoAtualizar.despe!.id);
    if (indiceDespesa === -1) return;

    const novoArray = [...Despesa];

    const despesaAtualizada = novoArray[indiceDespesa];
    despesaAtualizada.nome = nome;
    despesaAtualizada.valor = valor;
    despesaAtualizada.data = data;
    despesaAtualizada.categoria = categoria;
    
      const total = novoArray.reduce((acumulador, Despesa) => acumulador + Despesa.valor, 0);

      setDespesa(novoArray)

      setTotalDespesa(total);

      if(novoArray.length > 1){
        let media = total/novoArray.length;
        setMediaDespesa(media)
      }
      
      setNumeroDespesas(novoArray.length)

      setTextoAtualizar({
      enabled: false,
      despe: null
    })
    
     //limpando os campos(inputs)
    setNome("");
    setValor(0)
    setCategoria("");
    setdata("");

  }

  //funcao pra filtrar por categoria
  /*function filtrar(categoria: string){
    const arrayFiltrado = Despesa.filter(despesas => despesas.categoria === categoria)

    console.log(arrayFiltrado)
  }*/


  return (
    <>
      <section className='bg-[#f9fafb] h-screen'>
        {/* Titulos no topo */}
        <div className='top-text flex flex-col items-center pt-10'>
          <h1 className='text-4xl font-bold'>Gestão de Despesas</h1>
          <h2 className='lg:text-lg mt-4 text-gray-600'>Controle suas finanças de forma simples e eficientesssss</h2>
        </div>

        {/* Cards de resumo */}
        <div className='cds flex-col lg:flex-row md:flex items-center lg:gap-8 justify-center mt-8'>

          {/* Card 1 */}
          <div className='bg-white border border-gray-300 mx-3 lg:w-96 md:w-3xl h-32 md:h-36 lg:h-36 rounded-lg'>
            <div className='flex justify-between px-5 pt-5'>
              <div className='md:text-lg'>Total de despesas</div>
              <div className='text-gray-600'>
                <CircleDollarSign/>
              </div>
            </div>
            <div className='px-5 pt-3 md:pt-10 text-2xl font-bold'>
              <span>MZN {totalDespesa}</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className='bg-white border border-gray-300 mx-3 md:w-3xl lg:w-96 h-32 md:h-36 rounded-lg my-5'>
            <div className='flex justify-between px-5 pt-5'>
              <div className='md:text-lg'>Número de Despesas</div>
              <div className='text-gray-600'><Calculator/></div>
            </div>
            <div className='px-5 pt-3 md:pt-10 text-2xl font-bold'>
              <span>{numeroDespesas}</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className='bg-white border border-gray-300 mx-3 md:w-3xl lg:w-96 h-32 md:h-36 lg:h-36 rounded-lg'>
            <div className='flex justify-between px-5 pt-5'>
              <div className='md:text-lg'>Média por Despesa</div>
              <div className='text-gray-600'><ChartNoAxesColumn/></div>
            </div>
            <div className='px-5 pt-3 md:pt-10 text-2xl font-bold'>
              <span>MZN {mediaDespesa}</span>
            </div>
          </div>
        </div>


        {/* Areaa de gestao e visualizacao de despesas */}
        <div className='sm:flex gap-10 md:gap-0 lg:flex md:flex items-center justify-center lg:h-screen lg:gap-10 mt-10'>
          <div className='bg-white h-[500px] lg:h-[600px] md:h-[500px] mx-[6px] md:w-[360px] md:mx-10px] lg:w-[580px] border border-gray-300 rounded-md'>
            <div className='px-10 pt-5 lg:pt-10'>
              <div className='flex items-center gap-3'>
                <i><CirclePlus/></i>
                <h1 className='text-2xl'><b>Nova despesa</b></h1>
              </div>
              <p className='pt-2'>Adicione uma nova despesa ao seu controle financeiro</p>

              <div className='flex flex-col items-center justify-center mt-5'>
                <div className='lg:mr-[180px]'>
                  <label htmlFor="">Nome</label>
                  <input type="text" 
                  className='border border-gray-300 w-[340px] lg:w-80 h-10 rounded-sm indent-3 mt-2'
                  value={nome}
                  onChange={(e)=>{setNome(e.target.value)}}
                  required
                  />
                </div>

                <div className="flex gap-5 mt-3">
                  <div>
                    <label htmlFor="valor">Valor (Mzn)</label>
                    <div>
                    <input name='valor' className='border border-gray-300 w-[160px] lg:w-60 h-10 rounded-sm indent-3 mt-3' 
                    type="number"
                    placeholder='0'
                    value={valor}
                    onChange={(e)=>{setValor(Number(e.target.value))}}
                    />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="">Data</label>
                    <div><input className='border border-gray-300 w-[160px] lg:w-60 h-10 rounded-sm indent-3 mt-3' 
                    type="date"
                    value={data}
                    onChange={(e)=>{setdata(e.target.value)}}
                     /></div>
                  </div>
                </div>

                <div className='flex flex-col mt-5'>
                  <label htmlFor="">Categoria</label>
                  <select name="category"
                  id="category"
                  className='border border-gray-300 w-[340px] lg:w-[500px] h-10 rounded-sm indent-3 mt-2'
                  value={categoria}
                  onChange={(e)=>{setCategoria(e.target.value)}}
                  >
                  <option value="" disabled selected>Selecione uma categoria</option>
                  <option value="Alimentação">Alimentação</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Estudos">Estudos</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Lazer">Lazer</option>
                  <option value="Vestuário">Vestuário</option>
                  </select>
                </div>

                {/* <div className='mt-3'>
                  <label htmlFor="">Descrição</label>
                  <input type="text" 
                  className='border border-gray-300 w-[500px] h-20 rounded-sm indent-1 mt-3'
                  value={descricao}
                  onChange={(e)=>{setDescricao(e.target.value)}}/>
                </div> */}

                <div>
                  {textoAtualizar.enabled === false &&(
                  <button className='bg-black text-white border-gray-300 w-[340px] lg:w-[500px] h-10 rounded-md indent-1 mt-5 cursor-pointer'
                  onClick={adicionarDespesa}
                  >Adicionar despesa
                  </button>
                  )}
                  
                  {textoAtualizar.enabled === true &&(
                  <button className='bg-black text-white border-gray-300 w-[340px] lg:w-[500px] h-10 rounded-md indent-1 mt-5 cursor-pointer' onClick={atualizarDespesa}>Atualizar despesa</button>
                  )}

                </div>
              </div>
            </div>
          </div>


          {/* Visualizacao das despesas */}
          <div className='bg-white lg:h-[600px] md:h-[500px] lg:w-[580px] md:w-[450px] mx-[6px] border border-gray-300 rounded-md mt-10 lg:mt-0 md:mt-0 '>
             <div className='px-10 pt-10'>
              <div className="flex items-center gap-3">
                <i><ListCheck/></i>
                <h1 className='text-2xl'><b>Lista de despesas</b></h1>
              </div>
              <p className='my-3'>Visualize e gerencie todas as suas despesas</p>
              </div>

              <div className='px-10 mt-6 border-b border-gray-300'>
              {/* <div className='flex flex-col mt-5 border-b border-gray-300 h-[90px]'>
                  <label htmlFor="">Filtrar por categoria</label>
                  <select name="category"
                  id="category"
                  className='border border-gray-300 lg:w-[500px] h-10 rounded-sm indent-3 mt-2'
                  value={inputfiltroCategoria}
                  onChange={(e)=>{setinputFiltroCategoria(e.target.value)}}
                  >
                  <option value="" disabled selected>Selecione uma categoria</option>
                  <option value="Alimentação">Alimentação</option>
                  <option value="Transporte">Transporte</option>
                  <option value="Estudos">Estudos</option>
                  <option value="Saúde">Saúde</option>
                  <option value="Lazer">Lazer</option>
                  </select>

                  <button 
                  className='bg-black text-white'
                  onClick={()=> filtrar(inputfiltroCategoria)}
                  >filtar</button>
                </div> */}
          </div>


         {/* Area dos cards das despesas */}
<div className='flex flex-col gap-4 h-[280px] overflow-y-auto mt-4 px-2'>
  {Despesa.map((desp) => (
    <div 
      key={desp.id} 
      className='border border-gray-200 w-full max-w-[500px] mx-auto min-h-[140px] rounded-lg shadow-sm bg-white p-4 hover:shadow-md transition-shadow'
    >
      {/* Header do card com categoria e data */}
      <div className="flex justify-between items-center mb-3">
        <div className='bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm font-medium'>
          {desp.categoria}
        </div>
        <div className='flex items-center gap-1 text-gray-500 text-xs'>
          <CalendarCheck2 size={14}/>
          <span>{desp.data}</span>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className='flex justify-between items-start'>
        <div className='flex-1 pr-4'>
          <h3 className='text-lg font-semibold text-gray-900 mb-2 break-words'>
            {desp.nome}
          </h3>
          <div className='text-2xl font-bold text-green-600'>
            MZN {desp.valor}
          </div>
        </div>

        {/* Botões de ação */}
        <div className='flex gap-2 flex-shrink-0'>
          <button 
            onClick={() => valoresAtualizar(desp, desp.nome, desp.valor, desp.data, desp.categoria)} 
            className='border border-gray-300 rounded-md h-9 w-9 p-2 cursor-pointer hover:bg-blue-50 hover:border-blue-300 transition-colors flex items-center justify-center'
            title="Editar despesa"
          >
            <Pencil size={16} className="text-blue-600"/>
          </button>
          <button 
            onClick={() => removerDespesa(desp.id)} 
            className='border border-gray-300 rounded-md h-9 w-9 p-2 cursor-pointer hover:bg-red-50 hover:border-red-300 transition-colors flex items-center justify-center'
            title="Remover despesa"
          >
            <Trash size={16} className="text-red-600"/>
          </button>
        </div>
      </div>
    </div>
  ))}
</div>             
</div>
</div>

<footer className='bg-black h-96 lg:h-80'>
  <div className='px-10 lg:px-16 py-10 justify-between lg:flex text-gray-300'>
    <div>
      <h1>Desenvolvido por Emílio Marcelino Honório Branquinho</h1>
      <h1 className='mt-3 lg:mt-2'>Contactos:</h1>
      <div className='flex gap-2 mt-2 lg:mt-2'>
        <i><Phone/></i>
        <h2><a href="tel:+258862399225 ">+258 862399225</a></h2>
      </div>

      <div className="flex gap-2 mt-2 lg:mt-2">
        <i><Mail/></i>
        <h2><a href="mailto:emiliomarcelino400@gmail.com">emiliomarcelino400@gmail.com</a></h2>
      </div>
    </div>

    <div className='mt-12'>
      <h1>Redes Sociais</h1>
      <div className="flex mt-3 gap-2">
        <i className='bg-white text-black h-10 w-10 p-2 rounded-4xl'><Instagram/></i>
        <i className='bg-white text-black h-10 w-10 p-2 rounded-4xl'><Facebook/></i>
        <i className='bg-white text-black h-10 w-10 p-2 rounded-4xl'><Send/></i>
        <i className='bg-white text-black h-10 w-10 p-2 rounded-4xl'><Github/></i>
      </div>
    </div>
  </div>
  <div className='flex items-center justify-center text-sm text-gray-500 lg:mt-10'>
    <span>Copyright &copy; 2025 emhb</span>
  </div>
</footer>
</section>

    </>
  )
}


export default App
