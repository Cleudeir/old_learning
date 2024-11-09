export default function parseISODate(isoString: string) {
    const date = new Date(isoString);
    const day = date.getUTCDate().toString().padStart(2, "0");
    const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
    const year = date.getUTCFullYear().toString();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  