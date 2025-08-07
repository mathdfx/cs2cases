import React, { useState, useEffect } from 'react';

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
  const [wonItem, setWonItem] = useState(null);
  const [reelItems, setReelItems] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);

  const openCase = () => {
    if (isSpinning) return;

    setWonItem(null);
    setIsSpinning(true);

    const itemsForReel = [];
    for (let i = 0; i < 30; i++) {
      const randomIndex = Math.floor(Math.random() * lootTable.length);
      itemsForReel.push(lootTable[randomIndex]);
    }

    const finalWonItemIndex = Math.floor(Math.random() * lootTable.length);
    const finalWonItem = lootTable[finalWonItemIndex];
    itemsForReel[29] = finalWonItem;

    setReelItems(itemsForReel);
    setWonItem(finalWonItem);

    setTimeout(() => {
      setWonItem(finalWonItem);
    }, 50000); // Ajuste o tempo conforme necessário 

  };

  useEffect(() => {
    if (!isSpinning) return;
    const spinTimeout = setTimeout(() => {
      setIsSpinning(false);
    }, 5000); // Ajuste o tempo conforme necessário 

    // Limpa o timeout
    return () => clearTimeout(spinTimeout);
  }, [isSpinning]); // So é ativado quando isSpinning muda


  //Definição de classes em forma dinamamica 
  const displayBoxClasses = `min-h-[120] w-full max-w-md mx-auto my-5 p-4 rounded-lg flex justify-center items-center text-center border-2 transition-all duration-300 ${wonItem ? rarityClasses[wonItem.rarity] : 'border-gray-500 bg-gray-900/20'}`;

  return (
    <div className="bg-slate-900 text-slate-200 min-h-screen felx items-center justify-center font-sans">
      <div className="bg-slate-800 p-8 rounded-lg shadow 2xl text-center max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-sky-400 mb-2">Simulador de Caixa</h1>
        <p className="text-slate-400 mb-6">Feito com React, Vite & Twind</p>

        {/*Estrutura Roleta*/}
        <div className="relative w-full h-32 bg-slate-900/50 rounded-lg overflow-hidden my-6 border-2 border-slate-700">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full bg-sky-400 shadow-lg"></div>

          <div className={`absolute top-0 left-0 h-full flex items-center transition-transform duration-[5000ms] ease-out`}
            style={{
              // Se IsSpinning for true, aplica a rotação, Se não, não aplica nada
              transform: isSpinning ? 'translateX(calc(-100+8rem))' : 'translateX(0)',
            }}
          >
            {reelItems.map((item, index) => (

              <div key={index} className={`w-28 h-28 flex-shrink-0 mx-2 flex justify-center items-center p2 rounded-md border-2 ${rarityClasses[item.rarity]} `}>
                <p className="text-sm font-semibold">{item.name}</p>
              </div>
            ))}
          </div>
        </div>

          <button
            onClick={openCase}
            disabled={isSpinning}
            className="bg-sky-500 text-slate-900 font-bold text-lg px-8 py-3 rounded-md hover:bg-sky-400 transitio-all duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed"
            >
              {isSpinning ? 'Abrindo...' : 'Abrir Caixa'}
            </button>

      </div>
    </div>
  );
}
export default App;