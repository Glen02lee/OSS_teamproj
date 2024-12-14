const RIOT_API_BASE =
  "https://ddragon.leagueoflegends.com/cdn/10.6.1/data/en_US";

export const fetchRiotChampions = async () => {
  try {
    const response = await fetch(`${RIOT_API_BASE}/champion.json`);
    if (!response.ok) throw new Error("Failed to fetch champions");
    const data = await response.json();
    return Object.values(data.data || {});
  } catch (error) {
    console.error("Error fetching champions:", error);
    return [];
  }
};

export const fetchRiotRunes = async () => {
  try {
    const response = await fetch(`${RIOT_API_BASE}/runesReforged.json`);
    if (!response.ok) throw new Error("Failed to fetch runes");
    return await response.json();
  } catch (error) {
    console.error("Error fetching runes:", error);
    return [];
  }
};
