import { Product } from 'src/app/features/products/models/product.model';
const TAX_FOR_BOOKS = 10;
const STANDARD_TAX = 20;
const IMPORT_TAX = 5;

/**
 * Calcule le montant total des taxes pour un produit donné en appliquant :
 * - La taxe spécifique à sa catégorie (livres, nourriture, médicaments, etc.)
 * - Une taxe supplémentaire si le produit est importé
 * - Un arrondi commercial au 0.05€ supérieur
 */
export function calculateTaxes(product: Product): number {
  if (!product?.price) return 0;

  const baseTax = getBaseTaxRate(product.category);
  const totalTax = baseTax + (product.isImported ? IMPORT_TAX : 0);
  
  return roundToFiveCents(product.price * totalTax / 100);
}

/**
 * Détermine le taux de taxe de base selon la catégorie du produit.
 */
function getBaseTaxRate(category: string): number {
  switch (category) {
    case 'Books':
      return TAX_FOR_BOOKS;
    case 'Food':
    case 'Medicine':
      return 0;
    default:
      return STANDARD_TAX;
  }
}

/**
 * Arrondit un montant au 0.05€ supérieur.
 */
function roundToFiveCents(value: number): number {
  return Math.ceil(value * 20) / 20;
}