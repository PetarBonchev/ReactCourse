export const checkImageActualUrl = async (url: string): Promise<void> => {
  const urlExists = await new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
  if (!urlExists) {
    throw new Error("Invalid photo url.");
  }
};

export const checkStringLength = (
  text: string,
  canBeEmpty: boolean,
  maxLength: number,
  textName?: string
): void => {
  if (!canBeEmpty && text.length == 0) {
    throw new Error(
      textName ? `${textName} is required.` : "Field is required."
    );
  }

  if (text.length > maxLength) {
    throw new Error(
      textName
        ? `${textName} cannot exceed ${maxLength} characters.`
        : `Field cannot exceed ${maxLength} characters.`
    );
  }
};
