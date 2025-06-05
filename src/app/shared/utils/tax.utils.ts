import { Product } from 'src/app/features/products/models/product.model';

const TAX_FOR_BOOKS = 10;
const TAX_STANDARD = 20;
const TAX_IMPORT = 5;

// Catégories qui ne sont pas soumises à la taxe standard
const TAX_FREE_CATEGORIES = ['Food', 'Medecine'];

/**
 * Calcule le montant total des taxes pour un produit donné.
 * @param product Le produit concerné
 * @returns Le montant des taxes arrondi à 0,05 €
 */
export function calculateTaxes(product: Product): number {
  let taxPercentage = 0;

  if (product.category === 'Books') {
    taxPercentage += TAX_FOR_BOOKS;
  } else if (!TAX_FREE_CATEGORIES.includes(product.category)) {
    taxPercentage += TAX_STANDARD;
  }

  if (product.isImported) {
    taxPercentage += TAX_IMPORT;
  }

  const taxValue = product.price * (taxPercentage / 100);
  return roundToFiveCents(taxValue);
}

/**
 * Arrondit un montant à 0.05 € supérieur.
 */
function roundToFiveCents(value: number): number {
  return Math.ceil(value * 20) / 20;
}
