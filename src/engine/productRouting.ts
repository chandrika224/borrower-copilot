import type { BorrowerProfile } from '../types/borrower'

export type ProductRoute =
  | 'SECURED_BUSINESS'
  | 'BUSINESS'
  | 'VEHICLE'
  | 'PERSONAL'
  | 'OTHER'

export interface ProductRouteResult {
  route: ProductRoute
  reason: string
}

export function determineProductRoute(
  borrower: BorrowerProfile
): ProductRouteResult {
  const { purpose, type } = borrower.loanRequest
  const collateral = borrower.collateral

  if (
    purpose === 'BUSINESS' &&
    type === 'BUSINESS' &&
    collateral?.available === true &&
    (collateral.estimatedValue ?? 0) > 0
  ) {
    return {
      route: 'SECURED_BUSINESS',
      reason:
        'A secured business loan may be a better-fit route because you have an asset that could potentially be offered as security.',
    }
  }

  if (purpose === 'BUSINESS') {
    return {
      route: 'BUSINESS',
      reason:
        'The loan is for a business purpose, but no usable collateral information was provided.',
    }
  }

  if (purpose === 'VEHICLE') {
    return {
      route: 'VEHICLE',
      reason:
        'A vehicle loan may be a suitable product route for this borrowing purpose.',
    }
  }

  if (type === 'PERSONAL') {
    return {
      route: 'PERSONAL',
      reason:
        'The requested borrowing is being evaluated as an unsecured personal loan.',
    }
  }

  return {
    route: 'OTHER',
    reason:
      'The current prototype does not have enough information to identify a more specific product route.',
  }
}