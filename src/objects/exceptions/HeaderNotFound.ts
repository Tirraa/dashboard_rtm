export class HeaderNotFoundError extends Error {
  constructor(headerName: string) {
    super(`Header not found: Impossible to get the header "${headerName}"`);
    this.name = 'HeaderNotFoundError';
  }
}

export default HeaderNotFoundError;
