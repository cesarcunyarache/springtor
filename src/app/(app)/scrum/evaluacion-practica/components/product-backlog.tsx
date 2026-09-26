import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { UserStory } from "../types";

interface ProductBacklogProps {
  productBacklog: UserStory[];
}

export default function ProductBacklog({ productBacklog }: ProductBacklogProps) {
  return (
    <Card className=" bg-white shadow-sm border border-gray-200 gap-2">
      <CardHeader className="pb-3">
        <div className="flex items-center mb-1">
          <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
            2
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">
            Product Backlog
          </CardTitle>
        </div>
        <p className="text-sm text-gray-500">
          Todas las historias de usuario creadas y priorizadas
        </p>
      </CardHeader>

      <CardContent>
        {productBacklog.length === 0 ? (
          <div className="text-center py-10 text-gray-500 text-sm">
            No hay historias en el Product Backlog. Crea historias de usuario arriba.
          </div>
        ) : (
          <ScrollArea className="">
            <div className="grid md:grid-cols-2 gap-4">
              {productBacklog.map((story) => (
                <Card key={story.id} className="border-gray-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-base font-semibold text-gray-900">
                        {story.title}
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className={
                          story.priority === "Alta"
                            ? "bg-red-100 text-red-800"
                            : story.priority === "Media"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }
                      >
                        {story.priority}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-700 mb-3 italic">
                      Como <strong>{story.asA}</strong>, quiero{" "}
                      <strong>{story.iWant}</strong> para{" "}
                      <strong>{story.soThat}</strong>.
                    </p>

                    {story.acceptanceCriteria.length > 0 && (
                      <div className="mb-3">
                        <p className="text-xs font-semibold text-gray-600 mb-1">
                          Criterios de Aceptación:
                        </p>
                        <ul className="text-xs text-gray-600 space-y-1">
                          {story.acceptanceCriteria.map((criterion, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-green-600 mr-1">✓</span>
                              <span>{criterion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <Separator className="my-2" />

                    <div className="bg-gray-50 p-2 rounded">
                      <p className="text-xs font-semibold text-gray-600 mb-1">
                        Justificación de Prioridad:
                      </p>
                      <p className="text-xs text-gray-700">
                        {story.priorityJustification}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
