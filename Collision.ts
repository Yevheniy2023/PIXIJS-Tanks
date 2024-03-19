export class Collision {
   public static isCheckCollision(_entity: any, _area: any) {
        const tankBounds = _entity.container.getBounds();
        const wallBounds = _area.container.getBounds();
        return (
          tankBounds.x < wallBounds.x + wallBounds.width &&
          tankBounds.x + tankBounds.width > wallBounds.x &&
          tankBounds.y < wallBounds.y + wallBounds.height &&
          tankBounds.y + tankBounds.height > wallBounds.y
        );
      }
}