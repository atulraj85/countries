

export function createFormData(data: any, parentKey?: string): any[] {
  const formData: any[] = [];

  for (const [key, value] of Object.entries(data)) {
    if ( value === null) {
      continue; // Skip null values
    }

    const nestedKey = parentKey ? `${parentKey}_${key}` : key;

    formData.push({
      label: key,
      name: nestedKey,
      input: "textarea",
    });
  }

  return formData;
}