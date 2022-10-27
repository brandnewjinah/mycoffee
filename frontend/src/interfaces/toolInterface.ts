//tools
export interface Tool {
  _id?: string;
  name: string;
  brand?: string;
  description: string;
  instructionsUrl?: string;
  img: string;
}

export interface ToolErrors {
  name?: string;
  description?: string;
  instructionsUrl?: string;
}
