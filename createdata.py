import numpy as np

HEIGHT = 250

def pad_top(arr):
    return np.concatenate((arr,[-1 for _ in range(HEIGHT-len(arr))]))


def main():
    h = np.arange(0,HEIGHT)
    godis_o = np.linspace(60,74,165)/2
    godis_i = np.linspace(godis_o[17]*2,71,148)/2
    godis_ip = 17
    godis_v = np.zeros(len(godis_i))
    
    for i,r in enumerate(godis_i):
        godis_v[i] = np.pi*r*r
        if i > 0:
            godis_v[i] += godis_v[i-1]
    godis_v = godis_v/1000

    padbot = [-1 for _ in range(godis_ip)]
    godis_i = np.concatenate((padbot,godis_i))
    godis_i = pad_top(godis_i)
    godis_v = np.concatenate((padbot,godis_v))
    godis_v = pad_top(godis_v)
    godis_o = pad_top(godis_o)
    
    print('i')
    print(*godis_i,sep=",")
    print('o')
    print(*godis_o,sep=",")
    print('v')
    print(*godis_v,sep=",")
    print(np.array(np.where(godis_v>=400)).min())

if __name__ == '__main__':
    main()