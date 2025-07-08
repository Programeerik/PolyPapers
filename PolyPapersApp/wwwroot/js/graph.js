window.polyGraph = {
    initGraph: function (elementId, nodes, edges, dotNetHelper) {
        var cy = cytoscape({
            container: document.getElementById(elementId),
            elements: {
                nodes: nodes,
                edges: edges
            },
            style: [
                {
                    selector: 'node',
                    style: {
                        'background-color': '#212121',
                        'label': 'data(label)',
                        'text-wrap' : 'wrap',
                        'color': 'yellow',
                        'text-valign': 'center',
                        'text-halign': 'center',
                        'font-size': '16px',
                        'cursor': 'pointer',
                        'text-max-width': 80,
                        'width': 180,
                        'height': 180
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'width': 2,
                        'line-color': '#ccc',
                        'target-arrow-color': '#ccc',
                        'target-arrow-shape': 'triangle'
                    }
                },
                {
                    selector: 'node.selected',
                    style: {
                        'border-width': 4,
                        'border-color': '#ffcc00',
                        'background-color': '#ffcc00',
                        'color': '#000',
                        'font-weight': 'bold'
                    }
                }
            ],
            layout: {
                name: 'cose',
                animate: true,
                randomize: true,
                //idealEdgeLength: 100,
                nodeOverlap: 20,
                //nodeRepulsion: 800000,
                gravity: 80,
                numIter: 1000
            }

        });

        cy.on('tap', 'node', function (evt) {
            var node = evt.target;
            cy.nodes().removeClass('selected');
            node.addClass('selected');
            if (dotNetHelper) {
                dotNetHelper.invokeMethodAsync("OnNodeClicked", node.data('id'));
            }
        });
        window.cyInstance = cy;
    },
    addNodes: function (newNodes, newEdges, sourceNodeId) {
        if (window.cyInstance) {
            const cy = window.cyInstance;

            const zoom = cy.zoom();
            const pan = cy.pan();

            const addedNodes = cy.add(newNodes);
            const addedEdges = cy.add(newEdges);

            // Positioneer nieuwe nodes grofweg rond de geselecteerde node
            const sourceNode = cy.getElementById(sourceNodeId);
            if (sourceNode) {
                const pos = sourceNode.position();
                let angle = 0;
                const radius = 250;

                addedNodes.forEach((node, i) => {
                    const x = pos.x + radius * Math.cos(angle);
                    const y = pos.y + radius * Math.sin(angle);
                    node.position({ x, y });
                    angle += (2 * Math.PI) / addedNodes.length;
                });
            }

            // Optional layout op alleen de nieuwe nodes (als je 'cose' wil)
            // addedNodes.layout({ name: 'cose', animate: true }).run();

            cy.zoom(zoom);
            cy.pan(pan);
        }
    }

};
