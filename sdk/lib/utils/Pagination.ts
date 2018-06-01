/**
 * Utility for handling simple pagination options.
 */
export default interface Pagination {
  /**
   * The count of items to skip in the start of the results.
   */
  skip?: number;

  /**
   * The count of items in each page of the results.
   */
  limit?: number;
}
