import React, { useState } from 'react';

const itens = [
  { name: 'Glock-18 | Azul Fissurado', rarity: 'blue' },
  { name: 'USP-S | Córtex', rarity: 'blue' },
  { name: 'MP7 | Anodizado Azul', rarity: 'blue' },
  { name: 'M4A4 | O Imperador', rarity: 'purple' },
  { name: 'Glock-18 | Lanches', rarity: 'purple' },
  { name: 'AK-47 | Asiimov', rarity: 'pink' },
  { name: 'AWP | Hiper Fera', rarity: 'pink' },
  { name: 'M4A1-S | Printstream', rarity: 'red' },
  { name: 'AK-47 | Vulcan', rarity: 'red' },
  { name: 'Faca Karambit | Doppler', rarity: 'gold' }
];

const lootTable = []; 
itens.forEach(item => {
  let timeInTable = 1; 
  if (item.rarity === 'blue') timeInTable = 15;
  if (item.rarity === 'purple') timeInTable = 7;
  if (item.rarity === 'pink') timeInTable = 4;
  if (item.rarity === 'red') timeInTable = 2;
  for (let i = 0; i < timeInTable; i++) {
    lootTable.push(item);
  }
}); 

const rarityClasses = {
  blue: 'border-blue-500 bg-blue-900/20',
  purple: 'border-purple-500 bg-purple-900/20',
  pink: 'border-pink-500 bg-pink-900/20',
  red: 'border-red-500 bg-red-900/20',  
  gold: 'border-yellow-500 bg-yellow-900/20',
};

function App() {
  const[wonItem,setWonItem] = useState(null);
  const[reelItems, setReelItems] = useState([]);
  const[isSpring, setIsSpinning] = useState(false);

  const openCase = () => {
    const itemsForReel = [];
    for (let i = 0; i < 30; i++) {
      const randomIndex = Math.floor(Math.random() * lootTable.length);
      itemsForReel.push(lootTable[randomIndex]);
    }

  const finalWonItemIndex = Math.floor(Math.random() * lootTable.length);
  const finalWonItem = lootTable[finalWonItemIndex];
  itemsForReel[itemsForReel.length - 1] = finalWonItem;

  setReelItems(itemsForReel);
  setWonItem(finalWonItem);

  }
  

//Definição de classes em forma dinamamica 
const displayBoxClasses = `min-h-[120] w-full max-w-md mx-auto my-5 p-4 rounded-lg flex justify-center items-center text-center border-2 transition-all duration-300 ${wonItem ? rarityClasses[wonItem.rarity] : 'border-gray-500 bg-gray-900/20'}`;

return (
  <div className="bg-slate-900 text-slate-200 min-h-screen flex items-center justify-center font-sans">

    {/*CAIXA DO ITEM */ } 
  <div className="bg-slate-800 p-8 rounded-lg shadow-2xl text-center max-w-lg w-full">
    <h1 className="text-4xl font-bold text-sky-400 mb-2">Simulador de Caixa</h1>
    <p className="text-slate-400 mb-6">Feito com React, Vite & Twind</p>
  </div>

  {/* Roleta */}
  <div className="relative w-full h-32 bg-slate-900/50 rounded-lg overflow-hidden my-6 border-2 border-slate-700">
  
  {/*Linha de roleta */}
  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-sky-400"></div>

  {/* Caixa de exibição do item */}
  <div className="absolute top-0 left-0 h-full flex items-center">

  {reelItems.map((item, index) => (
    <div key={index} className={`w-28 h-28 flex-shrink-0 mx-2 flex justify-center items-center text-center p-2 rounded-md border-2 ${rarityClasses[item.rarity]}`}>

      <p className="text-sm font-semibold">{item.name}</p>
    
    </div>

  ))}

  </div>

  </div>

    {/*O Botão */}
    <button onClick={openCase} 
    className="bg-sky-500 text-slate-900 font-bold text-lg px-8 py-3 rounded-md hover:bg-sky-400 transition-colors duration-200"
    >
      Abrir Caixa
    </button>  
    
  </div>)};

export default App;