'use client';

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Trash2, Plus } from 'lucide-react';
import { Impediment, ImpedimentStatus } from '../types';

interface SprintImpedimentsSectionProps {
  teamMembers: string[];
  impediments: Impediment[];
  newImpediment: Omit<Impediment, 'id' | 'status'>;
  setNewImpediment: (value: Omit<Impediment, 'id' | 'status'>) => void;
  addImpediment: () => void;
  removeImpediment: (id: number) => void;
  updateImpedimentStatus: (id: number, status: ImpedimentStatus) => void;
}

export default function SprintImpedimentsSection({
  teamMembers,
  impediments,
  newImpediment,
  setNewImpediment,
  addImpediment,
  removeImpediment,
  updateImpedimentStatus,
}: SprintImpedimentsSectionProps) {
  return (
    <Card className="mb-6 shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-gray-900 flex items-center">
          <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm mr-3">
            7
          </span>
          Gestión de Impedimentos
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-gray-600 text-sm mb-4">
          Identifica bloqueos, asigna responsable y define un plan de acción
        </p>

        {/* Formulario */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div className="space-y-3">
            <div>
              <Label className="text-xs font-medium mb-1">Descripción del Impedimento*</Label>
              <Textarea
                value={newImpediment.description}
                onChange={(e) =>
                  setNewImpediment({ ...newImpediment, description: e.target.value })
                }
                placeholder="Ej: Servicio de correo SMTP no está configurado"
                rows={2}
              />
            </div>

            <div>
              <Label className="text-xs font-medium mb-1">Responsable*</Label>
              <Select
                value={newImpediment.responsible}
                onValueChange={(value) =>
                  setNewImpediment({ ...newImpediment, responsible: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar responsable..." />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((member) => (
                    <SelectItem key={member} value={member}>
                      {member}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <Label className="text-xs font-medium mb-1">Plan de Acción*</Label>
              <Textarea
                value={newImpediment.action}
                onChange={(e) =>
                  setNewImpediment({ ...newImpediment, action: e.target.value })
                }
                placeholder="Ej: Configurar credenciales SMTP en servidor de producción"
                rows={2}
              />
            </div>

            <div>
              <Label className="text-xs font-medium mb-1">Fecha Límite*</Label>
              <Input
                type="date"
                value={newImpediment.deadline}
                onChange={(e) =>
                  setNewImpediment({ ...newImpediment, deadline: e.target.value })
                }
              />
            </div>
          </div>
        </div>

        {/* Botón agregar */}
        <Button
          onClick={addImpediment}
          className="w-full text-white text-sm font-medium flex items-center justify-center mb-4"
        >
          <Plus className="w-4 h-4 mr-2" />
          Agregar Impedimento
        </Button>

        {/* Lista de impedimentos */}
        {impediments.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-semibold text-gray-900 text-sm">Impedimentos Registrados:</h3>
            {impediments.map((imp) => (
              <Card key={imp.id} className="border-orange-200 bg-orange-50">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900 text-sm mb-1">
                        {imp.description}
                      </p>
                      <p className="text-xs text-gray-600 mb-1">
                        <strong>Responsable:</strong> {imp.responsible}
                      </p>
                      <p className="text-xs text-gray-600 mb-1">
                        <strong>Acción:</strong> {imp.action}
                      </p>
                      <p className="text-xs text-gray-600 mb-2">
                        <strong>Plazo:</strong> {imp.deadline}
                      </p>

                      {/* Select para el status */}
                      <div className="w-40">
                        <Label className="text-xs font-medium mb-1">Estado</Label>
                        <Select
                          value={imp.status}
                          defaultValue='pendiente'
                          onValueChange={(value: ImpedimentStatus) =>
                            updateImpedimentStatus(imp.id, value)
                          }
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue placeholder="Seleccionar estado" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pendiente">Pendiente</SelectItem>
                            <SelectItem value="En progreso">En progreso</SelectItem>
                            <SelectItem value="Resuelto">Resuelto</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeImpediment(imp.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
