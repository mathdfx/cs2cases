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

  const openCase = () => {
    const randomIndex = Math.floor(Math.random() * lootTable.length);
    const newItem = lootTable[randomIndex];
    setWonItem(newItem);
  };
  

//Definição de classes em forma dinamamica 
const displayBoxClasses = `min-h-[120] w-full max-w-md mx-auto my-5 p-4 rounded-lg flex justify-center items-center text-center border-2 transition-all duration-300 ${wonItem ? rarityClasses[wonItem.rarity] : 'border-gray-500 bg-gray-900/20'}`;

return (
  <div className="bg-slate-900 text-slate-200 min-h-screen flex items-center justify-center font-sans">

    {/*CAIXA DO ITEM */ } 
  <div className="bg-slate-800 p-8 rounded-lg shadow-2xl text-center max-w-lg w-full">
    <h1 className="text-4xl font-bold text-sky-400 mb-2">Simulador de Caixa</h1>
    <p className="text-slate-400 mb-6">Feito com React, Vite & Twind</p>
  </div>
  {/*Caixa do Item */}
  <div className={displayBoxClasses}>
    {wonItem ? (
      <p className="text-2xl font-semibold">{wonItem.name.App}</p>
    ) : (
      <p className="text-6xl text-slate-500">?</p>
    )}
    </div>

    {/*O Botão */}
    <button onClick={openCase} 
    className="bg-sky-500 text-slate-900 font-bold text-lg px-8 py-3 rounded-md hover:bg-sky-400 transition-colors duration-200"
    >
      Abrir Caixa
    </button>  
    
  </div>)};

export default App;