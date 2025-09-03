import { AlertCircle, Loader2 } from "lucide-react";
import { useState } from "react";

export const MarkdownImage = ({ src, alt, ...props }: { src?: string; alt?: string }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hasError, setHasError] = useState(false)
  
    if (!src) {
      return (
        <div className="flex items-center gap-2 p-3 bg-muted rounded-md text-muted-foreground text-sm">
          <AlertCircle className="w-4 h-4" />
          <span>Imagen sin URL</span>
        </div>
      )
    }
  
    return (
      <div className="my-2 max-w-full">
        <div className="relative inline-block max-w-full">
          {isLoading && (
            <div className="flex items-center justify-center p-8 bg-muted rounded-md">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">Cargando imagen...</span>
              </div>
            </div>
          )}
  
          {hasError && (
            <div className="flex items-center gap-2 p-4 bg-muted rounded-md text-muted-foreground">
              <AlertCircle className="w-4 h-4" />
              <div className="text-sm">
                <p>No se pudo cargar la imagen</p>
                {alt && <p className="text-xs opacity-70">{alt}</p>}
              </div>
            </div>
          )}
  
          <img
            src={src || "/placeholder.svg"}
            alt={alt || "Imagen"}
            className={`max-w-full h-auto rounded-md shadow-sm transition-opacity duration-200 ${
              isLoading || hasError ? "hidden" : "block"
            }`}
            style={{
              maxHeight: "400px",
              borderRadius: `var(--radius)`,
            }}
            onLoad={() => {
              setIsLoading(false)
              setHasError(false)
            }}
            onError={() => {
              setIsLoading(false)
              setHasError(true)
            }}
            {...props}
          />
  
          {!isLoading && !hasError && alt && <p className="text-xs text-muted-foreground mt-1 italic">{alt}</p>}
        </div>
      </div>
    )
  }