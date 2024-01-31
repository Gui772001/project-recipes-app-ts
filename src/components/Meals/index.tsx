// import React, { useContext, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Context from '../../helpers/context/Context';
// import Footer from '../Footer';
// import './index.css';
// import FastButtons from '../FastButtons';

// function Meals() {
//   const navigate = useNavigate();
//   const { data, loading, filter } = useContext(Context);

//   useEffect(() => {
//     if (window.location.pathname.includes('in-progress')) {
//       console.log('preencher com detalhe da pag de receitas-in-progress');
//     } else if (data && data.meals && data.meals.length === 1
//       && filter.radio !== 'categories') {
//       const { idMeal } = data.meals[0];
//       navigate(`/meals/${idMeal}`);
//     }
//   }, [data, loading, navigate]);

//   function handleCard(idMeal: number) {
//     console.log(idMeal);
//     navigate(`/meals/${idMeal}`);
//   }

//   return (
//     <>
//       <div>
//         <FastButtons location="/meals" />
//       </div>
//       <div>
//         { data.meals
//         && data.meals.slice(0, 12).map((meal: any, index: number) => (
//           <div
//             key={ index }
//             data-testid={ `${index}-recipe-card` }
//             onClick={ () => handleCard(meal.idMeal) }
//             onKeyDown={ (e) => e.key === 'Enter' && handleCard(meal.idMeal) }
//             role="button"
//             tabIndex={ 0 }
//           >
//             <h2
//               data-testid={ `${index}-card-name` }
//             >
//               {meal.strMeal}
//             </h2>
//             <img
//               src={ meal.strMealThumb }
//               alt={ meal.strMeal }
//               style={ { width: '350px' } }
//               data-testid={ `${index}-card-img` }
//             />
//           </div>
//         ))}
//       </div>
//       <div
//         data-testid="footer"
//         className="footer-css"
//       >
//         <Footer />
//       </div>
//     </>
//   );
// }
// export default Meals;
