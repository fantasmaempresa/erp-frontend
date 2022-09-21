export class ClassWatcher {
  private observer!: MutationObserver;

  private lastClassState: boolean;

  constructor(
    private readonly targetNode: HTMLElement,
    private readonly classToWatch: string,
    private readonly classAddedCallback: () => void,
    private readonly classRemovedCallback?: () => void,
  ) {
    this.targetNode = targetNode;
    this.classToWatch = classToWatch;
    this.classAddedCallback = classAddedCallback;
    this.classRemovedCallback = classRemovedCallback;
    this.lastClassState = targetNode.classList.contains(this.classToWatch);

    this.init();
  }

  init() {
    this.observer = new MutationObserver(this.mutationCallback);
    this.observe();
  }

  observe() {
    this.observer.observe(this.targetNode, { attributes: true });
  }

  disconnect() {
    this.observer.disconnect();
  }

  mutationCallback = (mutationsList: any) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        const currentClassState = mutation.target.classList.contains(
          this.classToWatch,
        );
        if (this.lastClassState !== currentClassState) {
          this.lastClassState = currentClassState;

          if (currentClassState) {
            this.classAddedCallback();
          } else {
            if (this.classRemovedCallback) {
              this.classRemovedCallback();
            }
          }
        }
      }
    }
  };
}
