export function formatDate(value) {
    if (!value) return 'Kein Datum';

    if (typeof value === 'string' && value.includes('.')) {
        const parts = value.split('.');

        if (parts.length === 3) {
            const day = parts[0].padStart(2, '0');
            const month = parts[1].padStart(2, '0');
            const year = parts[2];

            return `${day}.${month}.${year}`;
        }
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return value;
    }

    return date.toLocaleDateString('de-CH', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}